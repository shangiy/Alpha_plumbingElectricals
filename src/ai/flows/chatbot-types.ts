/**
 * @fileOverview Types and schemas for the conversational AI agent.
 */
import {z} from 'genkit';

export const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response to the user."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
