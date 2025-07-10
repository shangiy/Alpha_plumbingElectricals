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

const ChatbotInputSchema = z.string().describe("The user's message to the chatbot.");
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.string().describe("The chatbot's response.");
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (message) => {
    const chatbotApiUrl = process.env.REPLIT_CHATBOT_URL;

    if (!chatbotApiUrl) {
      console.error('REPLIT_CHATBOT_URL is not defined in the environment variables.');
      return "I'm sorry, but I'm not configured correctly at the moment. Please contact support.";
    }

    try {
      const response = await fetch(chatbotApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        console.error('Chatbot API returned an error:', response.status, await response.text());
        return "I'm sorry, I'm having trouble connecting to my brain. Please try again later.";
      }

      const data = await response.json();
      
      // Assuming the Replit API returns a JSON object with a 'response' key
      if (data && data.response) {
        return data.response;
      } else {
        console.error('Unexpected response format from chatbot API:', data);
        return "I received a response I didn't understand. Could you try rephrasing?";
      }

    } catch (error) {
      console.error('Error calling the chatbot API:', error);
      return "I'm sorry, an unexpected error occurred while I was thinking. Could you please try again?";
    }
  }
);
