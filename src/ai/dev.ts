import { config } from 'dotenv';
config();

import '@/ai/flows/product-recommendations.ts';
import '@/ai/flows/product-description-generator.ts';
import '@/ai/flows/chatbot-flow.ts';
import '@/ai/tools/product-catalog.ts';
