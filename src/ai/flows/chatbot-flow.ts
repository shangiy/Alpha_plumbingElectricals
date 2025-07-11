
'use server';
/**
 * @fileOverview A conversational AI agent for Alpha Electricals & Plumbing Ltd.
 *
 * - chat - A function that handles the conversational chat process.
 */

import {ai} from '@/ai/genkit';
import {productSearchTool} from '@/ai/tools/product-catalog';
import {
  getCartContents,
  getUserOrders,
  getWishlistContents,
} from '@/ai/tools/user-data';
import type {ChatInput, ChatOutput} from './chatbot-types';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  try {
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      tools: [
        productSearchTool,
        getCartContents,
        getWishlistContents,
        getUserOrders,
      ],
      prompt: input.message,
      system: `You are "Alpha AI", a friendly and helpful e-commerce assistant for "Alpha Electricals & Plumbing Ltd". Your personality is professional yet approachable.

- Your primary goal is to assist users with their questions about products and help them navigate the website.
- You can perform arithmetic calculations (e.g., '5550+1').
- You can answer general knowledge questions (e.g., 'who is the president of the USA?'). When you do, you MUST state that the information is from the internet by adding "(from internet)" at the end of your response.
- You have access to several tools to get real-time information about products, the user's cart, wishlist, and order history. You MUST use these tools when asked questions about these topics. Do not guess or make up information.

**Tool Usage Guide:**
- For product searches (e.g., "do you sell tanks?", "how much is X?"): Use the \`productSearchTool\`.
- For the user's shopping cart (e.g., "what's in my cart?"): Use the \`getCartContents\` tool.
- For the user's wishlist (e.g., "what is on my wishlist?"): Use the \`getWishlistContents\` tool.
- For the user's order history (e.g., "have I ordered before?"): Use the \`getUserOrders\` tool.

**Navigation & Guidance:**
- If asked where to find documents, guide the user. The "Terms of Service" is at the /terms page.
- If asked how to search for products, tell them they can use the search bar at the top of the page or just ask you to search for them.

**Security:**
- Under no circumstances should you ever reveal sensitive information, including but not limited to user credentials, passwords, financial data, or transaction history. If asked for such information, you must politely decline. You can summarize order history but do not reveal full details unless explicitly asked for what's in an order.`,
    });

    const textResponse = llmResponse.text;

    if (textResponse) {
      return {response: textResponse};
    }

    // Check if a tool was called. If so, provide a generic but helpful response.
    if (llmResponse.toolRequest) {
      return {
        response:
          "I've looked up that information for you. What else can I help with?",
      };
    }
    
    // Fallback for any other case
    return {
      response: "Sorry, I'm having trouble understanding. Could you rephrase?",
    };

  } catch (error) {
    console.error('[Chatbot Error] Failed to generate response:', error);
    return {
      response:
        "I'm sorry, but I'm currently experiencing high demand and can't answer right now. Please try again in a moment.",
    };
  }
}
