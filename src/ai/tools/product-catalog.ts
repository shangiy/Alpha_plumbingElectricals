'use server';

/**
 * @fileOverview Defines a Genkit tool for searching the product catalog.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getProducts } from '@/lib/data';

export const productSearchTool = ai.defineTool(
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
  async (input) => {
    console.log(`[Tool] productSearchTool called with query: "${input.query}"`);
    const allProducts = await getProducts();
    const lowerCaseQuery = input.query.toLowerCase();
    
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
    ).map(product => ({
      name: product.name,
      price: product.price,
      description: product.description,
    }));
    
    return { products: results };
  }
);
