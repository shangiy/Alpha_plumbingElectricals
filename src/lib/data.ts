import type { Product, Category } from './types';

const categories: Category[] = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'home-goods', name: 'Home Goods' },
  { id: 'books', name: 'Books' },
  { id: 'industrial', name: 'Industrial' },
];

const products: Product[] = [
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
  {
    id: '2',
    name: 'Smartwatch Pro',
    description: 'Feature-packed smartwatch with health tracking and GPS.',
    longDescription: 'Stay connected and monitor your health with the Smartwatch Pro. It boasts a vibrant AMOLED display, comprehensive health tracking (heart rate, SpO2, sleep), built-in GPS, and up to 14 days of battery life. Syncs with both iOS and Android devices.',
    price: 249.99,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'electronics',
    rating: 4.6,
    reviews: 340,
    seller: { name: 'GadgetHouse', id: 'seller-2' },
  },
  {
    id: '3',
    name: 'Men\'s All-Weather Jacket',
    description: 'Waterproof and breathable jacket for all seasons.',
    longDescription: 'Designed for versatility, this all-weather jacket is fully waterproof, windproof, and breathable. It features a lightweight shell, a removable fleece liner, adjustable cuffs and hood, and multiple zippered pockets for secure storage. Perfect for hiking, commuting, or any outdoor adventure.',
    price: 129.99,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'apparel',
    rating: 4.9,
    reviews: 512,
    seller: { name: 'Outdoor Gear Co.', id: 'seller-3' },
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable chair with lumbar support and adjustable features.',
    longDescription: 'Improve your posture and comfort during long workdays. This ergonomic chair offers adjustable lumbar support, armrests, seat height, and tilt tension. The breathable mesh back keeps you cool, and the high-density foam cushion provides lasting support.',
    price: 350.0,
    images: ['https://placehold.co/600x600'],
    category: 'home-goods',
    rating: 4.7,
    reviews: 480,
    seller: { name: 'ComfortZone', id: 'seller-4' },
  },
  {
    id: '5',
    name: 'Bestselling Sci-Fi Novel',
    description: 'A thrilling adventure in space.',
    longDescription: '"The Last Voyager" is a gripping tale of interstellar exploration and discovery. When a lone astronaut awakens from cryo-sleep millions of light-years from home, she must unravel a cosmic mystery to find her way back. A must-read for fans of hard science fiction.',
    price: 19.99,
    images: ['https://placehold.co/600x600'],
    category: 'books',
    rating: 4.5,
    reviews: 2100,
    seller: { name: 'PageTurners', id: 'seller-5' },
  },
  {
    id: '6',
    name: 'CNC Milling Machine',
    description: 'Precision 3-axis CNC machine for small workshops.',
    longDescription: 'Bring industrial precision to your workshop with this compact 3-axis CNC milling machine. Ideal for prototyping and small-batch production of parts from aluminum, plastics, and wood. Features a rigid frame, high-speed spindle, and user-friendly control software.',
    price: 4500.0,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'industrial',
    rating: 4.8,
    reviews: 45,
    seller: { name: 'Pro-Machining Tools', id: 'seller-6' },
  },
  {
    id: '7',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound with industry-leading noise cancellation.',
    longDescription: 'Escape the noise and dive into your music. These headphones offer exceptional audio quality and superior active noise cancellation. With up to 30 hours of playtime, multi-device pairing, and a comfortable over-ear design, they are perfect for travel, work, and leisure.',
    price: 349.99,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'electronics',
    rating: 4.9,
    reviews: 1580,
    seller: { name: 'AudioPhile Gear', id: 'seller-7' },
  },
  {
    id: '8',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, durable, and ethically made.',
    longDescription: 'A wardrobe essential made from 100% GOTS certified organic cotton. This t-shirt is incredibly soft, breathable, and designed for a classic fit. Ethically produced in a fair-trade certified factory, it\'s a choice you can feel good about.',
    price: 35.0,
    images: ['https://placehold.co/600x600'],
    category: 'apparel',
    rating: 4.9,
    reviews: 890,
    seller: { name: 'Pure Threads', id: 'seller-8' },
  },
];

export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return products.find(p => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return categories;
}
