import { genkit, configure } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { productSearchToolLogic } from './tools/product-catalog';
import { z } from 'zod';

// 1. Initialize the core AI object
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

// 2. Define the tool using the initialized `ai` object
const productSearchTool = ai.defineTool(
  {
    name: 'productSearchTool',
    description: 'Searches the product catalog to find items based on a query. Use this to answer any questions about products.',
    inputSchema: z.object({
      query: z.string().describe('The search query, e.g., "tanks" or "solar heater".'),
    }),
    outputSchema: z.object({
      products: z.array(
        z.object({
          name: z.string(),
          price: z.number(),
          description: z.string(),
        })
      ),
    }),
  },
  productSearchToolLogic
);

// 3. Configure the `ai` object to use the newly defined tool
configure({
    tools: [productSearchTool],
});
