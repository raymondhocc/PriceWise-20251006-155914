import { AnalysisPayload, Product } from './types';
const API_BASE_URL = '/api/chat/pricewise-session';
export interface CommandResponse {
  success: boolean;
  data?: {
    type: 'product' | 'analysis' | 'error';
    payload: Product | AnalysisPayload | { message: string };
  };
  error?: string;
}
export async function sendCommand(command: string): Promise<CommandResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: command }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }
    const result = await response.json();
    if (result.success && result.data?.messages) {
      const lastMessage = result.data.messages[result.data.messages.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.content) {
        try {
          const parsedContent = JSON.parse(lastMessage.content);
          return { success: true, data: parsedContent };
        } catch (e) {
          return {
            success: true,
            data: { type: 'error', payload: { message: lastMessage.content } },
          };
        }
      }
    }
    return { success: false, error: 'Unexpected response structure from API.' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
export async function getProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products.';
    return { success: false, error: errorMessage };
  }
}
export async function deleteProduct(productId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete product.';
    return { success: false, error: errorMessage };
  }
}