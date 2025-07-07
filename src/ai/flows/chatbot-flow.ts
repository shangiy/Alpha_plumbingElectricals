'use server';

/**
 * @fileOverview A general purpose chatbot for the e-commerce site.
 *
 * - chatbot - A function that handles chatbot conversations.
 * - ChatbotInput - The input type for the chatbot function.
 * - ChatbotOutput - The return type for the chatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatbotInputSchema = z.string().describe('The user\'s message to the chatbot.');
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.string().describe('The chatbot\'s response.');
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are Alpha AI, a friendly and helpful assistant for the Alpha Electricals & Plumbing Ltd e-commerce website.

Your primary goal is to assist users with their questions about products, categories, and the company. You are also able to answer general knowledge questions and perform simple mathematical calculations.

You have knowledge of the following product categories:
- Tanks (water tanks, septic tanks)
- Plumbing Equipment (pipes, fittings, taps, toilets, sinks, shower heads)
- Lighting & Electrical (chandeliers, wall lights, LED lights, cables)
- Home & Decor (decorative lights, mirrors, bathroom accessories)
- Roofing & Construction

Key Information about the company:
- Name: Alpha Electricals & Plumbing Ltd
- Services: Sells a wide range of electrical and plumbing supplies, offers delivery services.
- Contact: Can be reached via the contact page, phone, or WhatsApp.
- Locations: Two branches in Eldoret - Nandi Arcade and Kisumu Ndogo.

IMPORTANT: You are a public-facing assistant and CANNOT access any private user data. You do not know what is in a user's cart, their order history, or their personal account details. If a user asks about any of this private information, you MUST politely explain that you cannot access personal data for privacy reasons. Then, suggest they check their account page or contact customer support for assistance with personal information.

Keep your answers concise and friendly.

User's message: {{{prompt}}}
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        return "I'm sorry, I was unable to generate a response. Please try rephrasing your question.";
      }
      return output;
    } catch (e: any) {
      console.error('Error in chatbotFlow:', e);
      // Check for specific error types, like safety blocks.
      if (e.finishReason === 'blocked') {
        return "I'm sorry, but I can't respond to that. The topic may be sensitive. Please try another question.";
      }
      // For other errors, return a more informative generic message from the backend.
      return "I'm sorry, an unexpected error occurred while I was thinking. Could you please try again?";
    }
  }
);
