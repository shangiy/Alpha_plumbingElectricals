'use server';
/**
 * @fileOverview A conversational AI agent for Alpha Electricals & Plumbing Ltd.
 *
 * - chat - A function that handles the conversational chat process.
 */

import {ai} from '@/ai/genkit';
import {productSearchTool} from '@/ai/tools/product-catalog';
import type {ChatInput, ChatOutput} from './chatbot-types';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const llmResponse = await ai.generate({
    model: 'googleai/gemini-2.0-flash',
    tools: [productSearchTool],
    prompt: input.message,
    system: `You are "Alpha AI", a friendly and helpful e-commerce assistant for "Alpha Electricals & Plumbing Ltd".
- Your primary goal is to assist users with their questions about products.
- To answer questions about product availability, pricing, or details, you MUST use the \`productSearchTool\`.
- Be conversational and concise.
- If you don't know the answer and it's a general knowledge question, you may answer it but you must state that the information is from the internet by adding "(from internet)" at the end of your response.
- You can perform basic arithmetic calculations.
- Under no circumstances should you ever reveal sensitive information, including but not limited to user credentials, passwords, financial data, or transaction history. If asked for such information, politely decline.`,
  });

  const textResponse = llmResponse.text;
  
  if (!textResponse) {
    // Check if a tool was called
    const toolResponse = llmResponse.toolRequest?.name;
    if (toolResponse) {
        return { response: "I've looked up that information for you. What else can I help with?" };
    }
    return { response: "Sorry, I'm having trouble understanding. Could you rephrase?" };
  }

  return { response: textResponse };
}
