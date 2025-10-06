import { Agent } from 'agents';
import type { Env } from './core-utils';
import type { ChatState, Product } from './types';
import { ChatHandler } from './chat';
import { API_RESPONSES } from './config';
import { createMessage } from './utils';
export class ChatAgent extends Agent<Env, ChatState> {
  private chatHandler?: ChatHandler;
  initialState: ChatState = {
    messages: [],
    sessionId: crypto.randomUUID(),
    isProcessing: false,
    model: 'openai/gpt-4o',
    products: [],
  };
  async onStart(): Promise<void> {
    this.chatHandler = new ChatHandler(this.env, this.state.model);
    // Ensure products array exists in state for backward compatibility
    if (!this.state.products) {
      this.setState({ ...this.state, products: [] });
    }
  }
  async onRequest(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      const method = request.method;
      const path = url.pathname;
      if (method === 'POST' && path === '/chat') {
        return this.handleChatMessage(await request.json());
      }
      if (method === 'GET' && path === '/products') {
        return this.handleGetProducts();
      }
      if (method === 'DELETE' && path.startsWith('/products/')) {
        const productId = path.split('/').pop();
        if (productId) {
          return this.handleDeleteProduct(productId);
        }
      }
      return Response.json({ success: false, error: API_RESPONSES.NOT_FOUND }, { status: 404 });
    } catch (error) {
      console.error('Request handling error:', error);
      return Response.json({ success: false, error: API_RESPONSES.INTERNAL_ERROR }, { status: 500 });
    }
  }
  private handleGetProducts(): Response {
    return Response.json({ success: true, data: this.state.products || [] });
  }
  private handleDeleteProduct(productId: string): Response {
    const initialCount = this.state.products.length;
    const updatedProducts = this.state.products.filter(p => p.id !== productId);
    if (updatedProducts.length < initialCount) {
      this.setState({ ...this.state, products: updatedProducts });
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
  }
  private async handleChatMessage(body: { message: string; }): Promise<Response> {
    const { message } = body;
    if (!message?.trim()) {
      return Response.json({ success: false, error: API_RESPONSES.MISSING_MESSAGE }, { status: 400 });
    }
    const userMessage = createMessage('user', message.trim());
    this.setState({
      ...this.state,
      messages: [...this.state.messages, userMessage],
      isProcessing: true
    });
    try {
      if (!this.chatHandler) {
        throw new Error('Chat handler not initialized');
      }
      const response = await this.chatHandler.processMessage(message, this.state.messages);
      const assistantMessage = createMessage('assistant', response.content, response.toolCalls);
      // Check if a new product was created and persist it
      const parsedContent = JSON.parse(response.content);
      if (parsedContent.type === 'product') {
        const newProduct = parsedContent.payload as Product;
        const updatedProducts = [...this.state.products];
        if (!updatedProducts.some(p => p.url === newProduct.url)) {
          updatedProducts.unshift(newProduct);
        }
        this.setState({
          ...this.state,
          messages: [...this.state.messages, assistantMessage],
          products: updatedProducts,
          isProcessing: false
        });
      } else {
        this.setState({
          ...this.state,
          messages: [...this.state.messages, assistantMessage],
          isProcessing: false
        });
      }
      return Response.json({ success: true, data: this.state });
    } catch (error) {
      console.error('Chat processing error:', error);
      this.setState({ ...this.state, isProcessing: false });
      return Response.json({ success: false, error: API_RESPONSES.PROCESSING_ERROR }, { status: 500 });
    }
  }
}