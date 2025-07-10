'use server';

/**
 * @fileOverview A general purpose chatbot for the e-commerce site.
 *
 * - chatbot - A function that handles chatbot conversations.
 * - ChatbotInput - The input type for the chatbot function.
 * - ChatbotOutput - The return type for the chatbot function.
 */

import {z} from 'zod';
import {ai} from '@/ai/genkit';
import { productSearchTool } from '@/ai/tools/product-catalog';

const ChatbotInputSchema = z.string().describe("The user's message to the chatbot.");
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.string().describe("The chatbot's response.");
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const chatbotPrompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatbotInputSchema },
    output: { schema: ChatbotOutputSchema },
    tools: [productSearchTool],
    system: `You are a helpful and friendly e-commerce assistant for a store called "Alpha Electricals & Plumbing Ltd".
    Your goal is to answer user questions accurately and concisely.
    - If the user asks about products, use the productSearchTool to find relevant items in the catalog.
    - When presenting product information, list the product name and its price.
    - If no relevant products are found, say that you couldn't find any products matching their query.
    - For questions about the company, our services, or anything not related to products, answer based on your general knowledge.
    - Keep your responses brief and to the point.
    `,
});


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (message) => {
    try {
        const { output } = await chatbotPrompt(message);
        if (output) {
            return output;
        }
        return "I'm sorry, I don't have an answer for that right now. Is there anything else I can help with?";
    } catch (error) {
        console.error('Error in chatbotFlow:', error);
        return "I'm sorry, an unexpected error occurred while I was thinking. Could you please try again?";
    }
  }
);
