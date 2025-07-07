import type { Product, Category, HomePageCategory } from './types';

const homePageCategories: HomePageCategory[] = [
    { id: 'decor', name: 'Home & Decor', image: '/decor.png' },
    { id: 'roofing', name: 'Roofing & Fencing', image: '/roof 2.png' },
    { id: 'lighting-electrical', name: 'Lighting & Electrical', image: '/electric cable.png' },
    { id: 'home-decor-2', name: 'Home & Decor', image: '/decor lighting design.png' },
    { id: 'roofing-2', name: 'Roofing & Fencing', image: '/roof 2.png' },
    { id: 'home-decor-3', name: 'Home & Decor', image: '/floor tiles.png' },
    { id: 'lighting-2', name: 'Lighting & Electrical', image: '/artistic lights.png' }
];

const featuredProducts: Product[] = [
  {
    id: 'ample-light',
    name: 'Ample Light',
    price: 2500.00,
    images: ['/Ample Light.png'],
    description: 'A beautiful and bright ample light.',
    longDescription: 'A beautiful and bright ample light, perfect for any room in your house.',
    category: 'lighting-electrical',
    rating: 4.5,
    reviews: 10,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'oval-toilet',
    name: 'Oval Toilet',
    price: 7500.00,
    images: ['/Oval Toilet.png'],
    description: 'A modern and efficient oval toilet.',
    longDescription: 'A modern and efficient oval toilet that saves water and adds a touch of class to your bathroom.',
    category: 'plumbing',
    rating: 4.8,
    reviews: 25,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'sink-cabinet',
    name: 'Whole complete sink and cabinet',
    price: 7000.00,
    images: ['/Whole complete sink and cabinet.png'],
    description: 'A complete sink and cabinet set.',
    longDescription: 'A complete sink and cabinet set, ready to install. Provides ample storage and a sleek look.',
    category: 'plumbing',
    rating: 4.7,
    reviews: 18,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'solar-heater',
    name: 'Solar Heater non-pressurized',
    price: 12000.00,
    images: ['/Solar Heater non-pressurized.png'],
    description: 'An energy-efficient solar water heater.',
    longDescription: 'An energy-efficient non-pressurized solar water heater, perfect for reducing your electricity bills.',
    category: 'plumbing',
    rating: 4.9,
    reviews: 32,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'artistic-lights',
    name: 'Artistic Lights',
    price: 3300.00,
    images: ['/Artistic Lights.png'],
    description: 'Unique and stylish artistic lights.',
    longDescription: 'A collection of unique and stylish artistic lights to make a statement in any room.',
    category: 'lighting-electrical',
    rating: 4.6,
    reviews: 15,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'electric-cable',
    name: 'Electric cable',
    price: 3000.00,
    images: ['/electric cable.png'],
    description: 'High-quality electric wiring cable.',
    longDescription: 'High-quality and durable electric wiring cable, available in various gauges for your needs.',
    category: 'lighting-electrical',
    rating: 4.9,
    reviews: 50,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'wall-bracket',
    name: 'Warm light wall bracket',
    price: 1900.00,
    images: ['/Warm light wall bracket.png'],
    description: 'An elegant warm light wall bracket.',
    longDescription: 'An elegant warm light wall bracket that provides a cozy and inviting ambiance.',
    category: 'lighting-electrical',
    rating: 4.5,
    reviews: 22,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'ppr-fittings',
    name: 'PPR Pipe Fittings',
    price: 30.00,
    images: ['/PPR Pipe Fittings.png'],
    description: 'A set of durable PPR pipe fittings.',
    longDescription: 'A complete set of durable PPR pipe fittings for all your plumbing projects.',
    category: 'plumbing',
    rating: 5.0,
    reviews: 110,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
];


const legacyProducts: Product[] = [
  {
    id: '1',
    name: 'Advanced Drone',
    description: 'High-performance drone with 4K camera and 30-min flight time.',
    longDescription: 'Capture stunning aerial footage with this professional-grade drone. Features include a 4K UHD camera, 3-axis gimbal stabilization, 30-minute flight time per battery, and intelligent flight modes like object tracking and waypoint navigation. Ideal for both hobbyists and professional photographers.',
    price: 799.99,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'electronics',
    rating: 4.8,
    reviews: 125,
    seller: { name: 'TechFly Inc.', id: 'seller-1' },
  },
];

const allProducts = [...featuredProducts, ...legacyProducts];

const categories: Category[] = [
  { id: 'lighting-electrical', name: 'Lighting & Electrical' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'decor', name: 'Home & Decor' },
  { id: 'roofing', name: 'Roofing & Fencing' },
  { id: 'electronics', name: 'Electronics' },
];

export async function getHomePageCategories(): Promise<HomePageCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return homePageCategories;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return featuredProducts;
}

export async function getProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return allProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return allProducts.find(p => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return categories;
}
