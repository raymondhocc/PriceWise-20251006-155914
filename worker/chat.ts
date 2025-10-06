import OpenAI from 'openai';
import type { Message } from './types';
import type { Env } from './core-utils';
import { executeTool } from './tools';
import { StatCardData, PriceHistory } from '../src/lib/types';
export class ChatHandler {
  private openai: OpenAI;
  private model: string;
  private env: Env;
  constructor(env: Env, model: string) {
    this.env = env;
    this.openai = new OpenAI({
      baseURL: env.CF_AI_BASE_URL,
      apiKey: env.CF_AI_API_KEY,
    });
    this.model = model;
  }
  async processMessage(
    message: string,
    conversationHistory: Message[]
  ): Promise<{
    content: string;
    toolCalls?: any[];
  }> {
    const command = message.trim().toLowerCase();
    let responsePayload: object;
    if (command.startsWith('monitor')) {
      const url = command.split(' ')[1];
      if (!url || !url.startsWith('http')) {
        responsePayload = {
          type: 'error',
          payload: { message: 'Invalid URL provided for monitoring.' },
        };
        return { content: JSON.stringify(responsePayload) };
      }
      try {
        const toolResult = await executeTool('web_search', { url }, this.env);
        if ('error' in toolResult) {
          throw new Error(`Failed to fetch content: ${toolResult.error}`);
        }
        const pageContent = (toolResult as { content: string }).content;
        const extractionPrompt = `
          From the following web page content, extract the product name, price (as a number, without currency symbols), and the main competitor or company name.
          Respond with only a valid JSON object in the format: {"name": "...", "price": ..., "competitor": "..."}.
          Do not include any other text, explanations, or markdown formatting.
          Web Page Content:
          ---
          ${pageContent}
          ---
        `;
        const completion = await this.openai.chat.completions.create({
          model: 'openai/gpt-4o',
          messages: [{ role: 'user', content: extractionPrompt }],
          response_format: { type: 'json_object' },
        });
        const extractedJSON = completion.choices[0].message.content;
        if (!extractedJSON) {
          throw new Error('LLM failed to extract data.');
        }
        const extractedData = JSON.parse(extractedJSON);
        const newProduct = {
          id: crypto.randomUUID(),
          name: extractedData.name || 'N/A',
          price: typeof extractedData.price === 'number' ? extractedData.price : 0,
          competitor: extractedData.competitor || 'N/A',
          url: url,
          lastScraped: new Date().toLocaleString('en-US', { hour12: true }),
        };
        responsePayload = {
          type: 'product',
          payload: newProduct,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during scraping.';
        responsePayload = {
          type: 'error',
          payload: { message: `Scraping failed: ${errorMessage}` },
        };
      }
    } else if (command.startsWith('calculate') || command.startsWith('show')) {
      // Perform analysis based on a representative, deterministic dataset.
      // NOTE: A stateful implementation is required to use live scraped data.
      const newStats: StatCardData[] = [
        {
          title: 'Average Market Price',
          value: '1,254.50',
          change: '+2.1%',
          changeType: 'increase',
        },
        {
          title: 'Price Index',
          value: '104.5',
          change: '-0.5%',
          changeType: 'decrease',
        },
        {
          title: 'Margin Impact',
          value: '+14,500',
          change: '+1.8%',
          changeType: 'increase',
        },
      ];
      const newPriceHistory: PriceHistory[] = [
        { date: 'Jan', 'Your Price': 980, 'Competitor Average': 1050 },
        { date: 'Feb', 'Your Price': 1020, 'Competitor Average': 1080 },
        { date: 'Mar', 'Your Price': 1010, 'Competitor Average': 1100 },
        { date: 'Apr', 'Your Price': 1150, 'Competitor Average': 1120 },
        { date: 'May', 'Your Price': 1180, 'Competitor Average': 1150 },
        { date: 'Jun', 'Your Price': 1210, 'Competitor Average': 1190 },
        { date: 'Jul', 'Your Price': 1254.5, 'Competitor Average': 1225.0 },
      ];
      responsePayload = {
        type: 'analysis',
        payload: {
          stats: newStats,
          priceHistory: newPriceHistory,
        },
      };
    } else {
      responsePayload = {
        type: 'error',
        payload: { message: 'Command not recognized. Try "monitor [url]" or "calculate price index".' },
      };
    }
    return { content: JSON.stringify(responsePayload) };
  }
  updateModel(newModel: string): void {
    this.model = newModel;
  }
}