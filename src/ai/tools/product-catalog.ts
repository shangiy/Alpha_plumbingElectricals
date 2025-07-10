'use server';

/**
 * @fileOverview Defines the logic for a Genkit tool that searches the product catalog.
 */

import { getProducts } from '@/lib/data';

interface ProductSearchInput {
  query: string;
}

export async function productSearchToolLogic(input: ProductSearchInput) {
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
