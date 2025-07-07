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

Your goal is to assist users with their questions about products, categories, and the company.

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

IMPORTANT: You CANNOT access user-specific information. You do not know what is in their cart, their order history, or their personal account details. If asked about these things, politely explain that you don't have access to personal data for privacy reasons and direct them to their account page or customer support.

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
    const {output} = await prompt(input);
    return output!;
  }
);
