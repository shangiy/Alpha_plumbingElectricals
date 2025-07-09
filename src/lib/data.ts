import type { Product, Category, HomePageCategory, CarouselCategory, MockUser, Transaction } from './types';

const homePageCategories: HomePageCategory[] = [
    { id: 'decor', name: 'Home & Decor', image: '/decor.png' },
    { id: 'roofing', name: 'Roofing & Fencing', image: '/roof 2.png' },
    { id: 'lighting-electrical', name: 'Lighting & Electrical', image: '/electric cable.png' },
    { id: 'home-decor-2', name: 'Home & Decor', image: '/decor lighting design.png' },
    { id: 'roofing-2', name: 'Roofing & Fencing', image: '/roof 2.png' },
    { id: 'home-decor-3', name: 'Home & Decor', image: '/floor tiles.png' },
    { id: 'lighting-2', name: 'Lighting & Electrical', image: '/artistic lights.png' }
];

const carouselCategories: CarouselCategory[] = [
  { id: 'lighting-1', name: 'Lighting & Electrical', image: '/aesthetic Light.png', href: '#' },
  { id: 'plumbing-1', name: 'Plumbing Equipment', image: '/ppr joints.png', href: '/plumbing' },
  { id: 'tanks-1', name: 'Tanks', image: '/kentank 2000l.png', href: '/tanks' },
  { id: 'decor-1', name: 'Home & Decor', image: '/birds lights.png', href: '/decor' },
  { id: 'roofing-1', name: 'Roofing & Fencing', image: '/roof 2.png', href: '#' },
  { id: 'lighting-2', name: 'Lighting & Electrical', image: '/Electric cable per roll.jpg', href: '#' },
  { id: 'decor-2', name: 'Home & Decor', image: '/crystall chanderlier.png', href: '/decor' },
  { id: 'roofing-2', name: 'Roofing & Fencing', image: '/roof 3.png', href: '#' },
  { id: 'decor-3', name: 'Home & Decor', image: '/MDF & chipboard.png', href: '/decor' },
  { id: 'lighting-3', name: 'Lighting & Electrical', image: '/classic chandelier.png', href: '#' },
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
    barcode: 'ALPHA-ELEC-001',
    colors: ['White', 'Silver'],
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
    barcode: 'ALPHA-PLUMB-002',
    colors: ['White'],
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
    colors: ['White', 'Black'],
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
    colors: ['Silver'],
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
    colors: ['Black', 'Red', 'Blue', 'Green'],
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
    colors: ['Silver'],
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

const tankProducts: Product[] = [
  {
    id: 'kentank-2000l',
    name: 'Kentank 2000L',
    price: 15000.00,
    images: ['/kentank 2000l.png'],
    description: 'A durable 2000L Kentank water tank.',
    longDescription: 'A durable 2000L Kentank water tank, ideal for domestic water storage. Made from high-quality food-grade material.',
    category: 'tanks',
    rating: 4.7,
    reviews: 45,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
    colors: ['Black', 'Green'],
  },
  {
    id: 'kentank-3000l',
    name: 'Kentank 3000L',
    price: 10000.00,
    images: ['/kentanks 3000L.png'],
    description: 'A large 3000L Kentank water tank.',
    longDescription: 'A large 3000L Kentank water tank, perfect for residential or commercial use. UV-stabilized for long life.',
    category: 'tanks',
    rating: 4.8,
    reviews: 30,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
    colors: ['Black', 'Green'],
  },
  {
    id: 'cuboid-tank',
    name: 'Water Tank',
    price: 6500.00,
    images: ['/cuboidTank.PNG'],
    description: 'A space-saving cuboid water tank.',
    longDescription: 'A space-saving cuboid water tank, designed for areas with limited space. Easy to install and maintain.',
    category: 'tanks',
    rating: 4.5,
    reviews: 20,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
    colors: ['White'],
  },
  {
    id: 'septic-tank',
    name: 'Septic Tank',
    price: 20000.00,
    images: ['/septic Tank.png'],
    description: 'A reliable and robust septic tank.',
    longDescription: 'A reliable and robust septic tank for effective wastewater management. Built to last with high-strength materials.',
    category: 'tanks',
    rating: 4.9,
    reviews: 55,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
    colors: ['Black'],
  },
  {
    id: 'plastic-reservoir-tank',
    name: 'Reservoir Tank',
    price: 5000.00,
    images: ['/plastic-tank.png'],
    description: 'A versatile plastic reservoir tank.',
    longDescription: 'A versatile plastic reservoir tank for various water storage needs. Lightweight and corrosion-resistant.',
    category: 'tanks',
    rating: 4.4,
    reviews: 15,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'top-tank-1500l',
    name: 'Top Tank 1500L',
    price: 4500.00,
    images: ['/top tank 1500L.png'],
    description: 'A compact 1500L Top Tank.',
    longDescription: 'A compact 1500L Top Tank, suitable for smaller households. Made with durable, high-quality plastic.',
    category: 'tanks',
    rating: 4.6,
    reviews: 28,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'top-tank-2000l',
    name: 'Tank 2000L',
    price: 5000.00,
    images: ['/top tank.png'],
    description: 'A standard 2000L Top Tank.',
    longDescription: 'A standard 2000L Top Tank offering great value and reliability for your water storage requirements.',
    category: 'tanks',
    rating: 4.7,
    reviews: 35,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'rainwater-tank',
    name: 'Rainwater Harvesting Tank',
    price: 8000.00,
    images: ['/rainwater-tank.png'],
    description: 'Tank designed for rainwater harvesting.',
    longDescription: 'An eco-friendly solution for water conservation. This tank is specifically designed for efficient rainwater harvesting.',
    category: 'tanks',
    rating: 4.8,
    reviews: 40,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
];

const decorProducts: Product[] = [
  {
    id: 'golden-chandelier',
    name: 'Golden Chandelier',
    price: 3500.00,
    images: ['/golden chandelier.png'],
    description: 'An elegant golden chandelier for a luxurious touch.',
    longDescription: 'An elegant golden chandelier for a luxurious touch. Perfect for dining rooms, living rooms, and grand entryways. Features high-quality crystals and a durable gold-finish frame.',
    category: 'decor',
    rating: 4.8,
    reviews: 22,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'rugged-chandelier',
    name: 'Rugged Chandelier',
    price: 5000.00,
    images: ['/rugged chandelier.png'],
    description: 'A stylish rugged chandelier with a modern design.',
    longDescription: 'A stylish rugged chandelier with a modern design. Its unique industrial look adds character to any space. Made with high-quality materials for longevity.',
    category: 'decor',
    rating: 4.7,
    reviews: 19,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'square-lights',
    name: 'Decorative Square Lights',
    price: 2800.00,
    images: ['/square lights.png'],
    description: 'Modern and sleek decorative square lights.',
    longDescription: 'Modern and sleek decorative square lights that provide a minimalist aesthetic. Energy-efficient LED technology ensures bright light with low power consumption.',
    category: 'decor',
    rating: 4.6,
    reviews: 31,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'birds-lights',
    name: 'Birds Lights',
    price: 1900.00,
    images: ['/birds lights.png'],
    description: 'Whimsical bird-shaped decorative lights.',
    longDescription: 'Add a touch of nature and whimsy to your room with these charming bird-shaped lights. Perfect for nurseries, bedrooms, or any space that needs a creative flair.',
    category: 'decor',
    rating: 4.9,
    reviews: 40,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'pinkish-sink',
    name: 'Pinkish Sink',
    price: 3000.00,
    images: ['/pinkish sink.png'],
    description: 'A chic and modern pinkish sink.',
    longDescription: 'Make a bold statement in your bathroom with this chic and modern pinkish sink. Made from high-quality ceramic, it is both durable and stylish.',
    category: 'decor',
    rating: 4.5,
    reviews: 15,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'bathroom-makeover-sink',
    name: 'Bathroom Makeover Sink',
    price: 7500.00,
    images: ['/Bathroom makeOver Sink.png'],
    description: 'Complete sink unit for a bathroom makeover.',
    longDescription: 'A complete sink and vanity unit to instantly upgrade your bathroom. Includes a modern basin, faucet, and storage cabinet. Easy to install.',
    category: 'decor',
    rating: 4.8,
    reviews: 25,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'monkey-lights',
    name: 'Monkey Lights',
    price: 4000.00,
    images: ['/monkey lights.png'],
    description: 'Playful and unique monkey-themed lights.',
    longDescription: 'Bring a sense of fun and adventure to your decor with these playful monkey-themed lights. A great conversation starter and a unique piece of functional art.',
    category: 'decor',
    rating: 4.7,
    reviews: 18,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'golden-stripe-chandelier',
    name: 'Golden Stripe Chandelier',
    price: 8000.00,
    images: ['/Golden stripe Chandelier.jpg'],
    description: 'A luxurious chandelier with golden stripes.',
    longDescription: 'This luxurious chandelier features a beautiful design with golden stripes, creating a stunning visual effect. It is the perfect centerpiece for a sophisticated room.',
    category: 'decor',
    rating: 4.9,
    reviews: 30,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
   {
    id: 'blackmate-golden-chandelier',
    name: 'BlackMate Golden Chandelier',
    price: 8500.00,
    images: ['/BlackMate golden Chandelier.jpg'],
    description: 'Elegant black matte and golden chandelier.',
    longDescription: 'Combining black matte and golden finishes, this chandelier offers a contemporary and elegant look. Its high-quality construction ensures it will be a lasting addition to your home.',
    category: 'decor',
    rating: 4.8,
    reviews: 28,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
   {
    id: 'wall-lights',
    name: 'Wall Lights',
    price: 2000.00,
    images: ['/Wall lights.jpg'],
    description: 'Stylish and modern wall lights for any room.',
    longDescription: 'These stylish and modern wall lights provide excellent ambient lighting and can complement a variety of decor styles. Energy-efficient and easy to install.',
    category: 'decor',
    rating: 4.6,
    reviews: 35,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
   {
    id: 'modern-soap-dish',
    name: 'Modern Soap Dish',
    price: 1500.00,
    images: ['/soap dish.png'],
    description: 'A sleek and modern soap dish for your bathroom.',
    longDescription: 'Keep your soap dry and your counter clean with this sleek and modern soap dish. Its minimalist design fits perfectly in any contemporary bathroom.',
    category: 'decor',
    rating: 4.5,
    reviews: 50,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
   {
    id: 'round-brown-frencia-countertop',
    name: 'Round Brown Frencia Countertop',
    price: 5500.00,
    images: ['/Round brown frencia countertop.jpg'],
    description: 'A beautiful round brown frencia countertop sink.',
    longDescription: 'This countertop sink features a beautiful round brown frencia design, adding a touch of rustic elegance to your bathroom. Made from durable, high-quality material.',
    category: 'decor',
    rating: 4.7,
    reviews: 21,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'golden-layers-chandelier',
    name: 'Golden Layers Chandelier',
    price: 4000.00,
    images: ['/golden layers.jpg'],
    description: 'A stunning chandelier with golden layers.',
    longDescription: 'This stunning chandelier features multiple golden layers that create a captivating light effect. A perfect statement piece for modern and classic interiors.',
    category: 'decor',
    rating: 4.8,
    reviews: 19,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'pink-oval-frencia-toilet',
    name: 'PinkOval Frencia Toilet',
    price: 8500.00,
    images: ['/PinkOval Frencia toilet.jpg'],
    description: 'A unique pink oval frencia toilet.',
    longDescription: 'Add a splash of color and unique style to your bathroom with this pink oval frencia toilet. Combines a distinctive look with modern, water-saving functionality.',
    category: 'decor',
    rating: 4.6,
    reviews: 12,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'designer-single-unit-toilet',
    name: 'Designer Single-Unit Toilet',
    price: 29500.00,
    images: ['/Designer singleUnit toilet.jpg'],
    description: 'A high-end designer single-unit toilet.',
    longDescription: 'Experience luxury with this high-end designer single-unit toilet. Its seamless design and premium features offer superior comfort and performance.',
    category: 'decor',
    rating: 5.0,
    reviews: 8,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'striped-chandelier',
    name: 'Striped Chandelier',
    price: 8000.00,
    images: ['/Striped Chandelier.jpg'],
    description: 'A modern chandelier with a striped design.',
    longDescription: 'This modern chandelier features a unique striped design that makes it a focal point in any room. Provides ample lighting while being a work of art.',
    category: 'decor',
    rating: 4.7,
    reviews: 14,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'decor-large-chandelier',
    name: 'Decor Large Chandelier',
    price: 14500.00,
    images: ['/Decor large Chandelier.jpg'],
    description: 'A large and impressive decorative chandelier.',
    longDescription: 'Make a grand statement with this large decorative chandelier. Its intricate design and impressive size are perfect for spaces with high ceilings.',
    category: 'decor',
    rating: 4.9,
    reviews: 20,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'classic-chandelier',
    name: 'Classic Chandelier',
    price: 2500.00,
    images: ['/classic chandelier.png'],
    description: 'A timeless and classic chandelier.',
    longDescription: 'This timeless chandelier brings classic elegance to any home. Its graceful design and warm light create a welcoming atmosphere.',
    category: 'decor',
    rating: 4.6,
    reviews: 45,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'stylish-mirror',
    name: 'Stylish Mirror',
    price: 2000.00,
    images: ['/Stylish mirror.jpg'],
    description: 'A stylish mirror to enhance your decor.',
    longDescription: 'Enhance your decor with this stylish mirror. Its modern frame and high-quality reflection make it a perfect addition to any room, from entryways to bathrooms.',
    category: 'decor',
    rating: 4.5,
    reviews: 33,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: '5-lamp-chandelier-general',
    name: '5-Lamp Chandelier General',
    price: 5100.00,
    images: ['/5 Lamp Chandelier General.png'],
    description: 'A general-purpose 5-lamp chandelier.',
    longDescription: 'A versatile 5-lamp chandelier that provides ample light and fits well in a variety of settings. A practical and stylish lighting solution.',
    category: 'decor',
    rating: 4.7,
    reviews: 28,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'hexagonal-decor-light',
    name: 'Hexagonal Decor Light',
    price: 3800.00,
    images: ['/hexagonal decor light.jpg'],
    description: 'A modern hexagonal decorative light fixture.',
    longDescription: 'This modern decorative light features a trendy hexagonal design. It can be used alone or grouped together to create a custom lighting installation.',
    category: 'decor',
    rating: 4.8,
    reviews: 15,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'round-smart-mirror',
    name: 'Round Smart Mirror',
    price: 4500.00,
    images: ['/Round smart mirror.jpg'],
    description: 'A round smart mirror with LED lighting.',
    longDescription: 'Upgrade your bathroom with this round smart mirror. It features integrated LED lighting with adjustable brightness and an anti-fog function.',
    category: 'decor',
    rating: 4.9,
    reviews: 25,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'stunning-mirror',
    name: 'Stunning Mirror',
    price: 1000.00,
    images: ['/Stunning mirror.jpg'],
    description: 'A stunning mirror with a unique frame.',
    longDescription: 'This stunning mirror features a unique and eye-catching frame that makes it a piece of wall art. Perfect for adding a decorative touch to any space.',
    category: 'decor',
    rating: 4.7,
    reviews: 30,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'ceiling-3mode-light',
    name: 'Ceiling 3-Mode Light',
    price: 6500.00,
    images: ['/Ceiling 3mode light.jpg'],
    description: 'A ceiling light with 3 different light modes.',
    longDescription: 'This versatile ceiling light offers three different light modes (e.g., warm, cool, and neutral) to suit any mood or occasion. Sleek, modern, and energy-efficient.',
    category: 'decor',
    rating: 4.8,
    reviews: 22,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'square-toilet',
    name: 'Square Toilet',
    price: 29000.00,
    images: ['/square toilet.jpg'],
    description: 'A modern, geometric square toilet.',
    longDescription: 'This toilet features a bold, geometric square design for a distinctly modern bathroom. Includes a soft-close seat and efficient dual-flush system.',
    category: 'decor',
    rating: 4.9,
    reviews: 10,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
  {
    id: 'designer-sink',
    name: 'Designer Sink',
    price: 3500.00,
    images: ['/Designer sink.jpg'],
    description: 'A designer sink with a unique shape.',
    longDescription: 'This designer sink stands out with its unique shape and high-quality finish. It serves as a functional sculpture for your bathroom countertop.',
    category: 'decor',
    rating: 4.7,
    reviews: 18,
    seller: { name: 'Alpha Electricals', id: 'seller-alpha' },
  },
];

const plumbingProducts: Product[] = [
    { id: 'plumbing-pipe', name: 'Plumbing Pipe', price: 2000.00, images: ['/ppr pipes.png'], description: 'High-quality plumbing pipes.', longDescription: 'Durable and reliable plumbing pipes suitable for a variety of residential and commercial applications. Available in multiple sizes.', category: 'plumbing', rating: 4.8, reviews: 80, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'ppr-elbows', name: 'PPR elbows', price: 100.00, images: ['/pipe elbows.png'], description: 'Durable PPR elbows for pipe fitting.', longDescription: 'High-quality PPR elbows for changing pipe direction. Designed for a secure, leak-proof fit.', category: 'plumbing', rating: 4.9, reviews: 150, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'tee-ppr-connector', name: 'Tee PPR connector', price: 50.00, images: ['/Tee PPR connector.png'], description: 'A reliable Tee PPR connector.', longDescription: 'A T-shaped connector for joining three pipes. Made from high-grade PPR for durability and heat resistance.', category: 'plumbing', rating: 4.9, reviews: 200, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'plumbing-valve', name: 'Plumbing Valve', price: 1500.00, images: ['/ppr pipe fittings.png'], description: 'A robust valve for plumbing systems.', longDescription: 'A durable plumbing valve to control water flow. Features easy operation and a long service life.', category: 'plumbing', rating: 4.7, reviews: 95, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'ppr-pipe-roll', name: 'PPR pipe roll', price: 8000.00, images: ['/100m PPR roll.png'], description: 'A 100m roll of PPR pipe.', longDescription: 'A 100-meter roll of flexible and durable PPR pipe, suitable for large-scale plumbing installations.', category: 'plumbing', rating: 4.8, reviews: 60, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'hdpe-pipe', name: 'HDPE 100M PIPE PN6 50mm', price: 12000.00, images: ['/HDPE 100M PIPE.jpg'], description: '100m of 50mm HDPE pipe.', longDescription: 'High-density polyethylene pipe, 100 meters long and 50mm in diameter, suitable for high-pressure applications.', category: 'plumbing', rating: 4.9, reviews: 40, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'pvc-waste-pipes', name: 'PVC Waste Pipes 6 Inches', price: 3500.00, images: ['/PVC Waste Pipes 6 In .jpg'], description: '6-inch PVC pipes for waste management.', longDescription: 'Durable 6-inch PVC pipes designed for waste and drainage systems. Resistant to chemicals and corrosion.', category: 'plumbing', rating: 4.6, reviews: 70, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'danco-hosepipe', name: 'Danco Hosepipe', price: 2000.00, images: ['/Danco Hosepipe.jpg'], description: 'A flexible and durable Danco hosepipe.', longDescription: 'A high-quality hosepipe from Danco, perfect for gardening and other outdoor uses. Kink-resistant and built to last.', category: 'plumbing', rating: 4.5, reviews: 85, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'pillar-water-tap', name: 'Pillar Water tap', price: 1500.00, images: ['/Pillar taps.jpg'], description: 'A classic pillar water tap.', longDescription: 'A classic and elegant pillar tap with a chrome finish. Easy to install and use, suitable for any bathroom or kitchen.', category: 'plumbing', rating: 4.7, reviews: 110, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'sensor-taps', name: 'Sensor taps with On Off touchpad', price: 8000.00, images: ['/Sensor taps with On Off touchpad.Jpg'], description: 'Modern sensor taps with a touchpad.', longDescription: 'A touchless sensor tap for improved hygiene. Features a convenient on/off touchpad for manual operation.', category: 'plumbing', rating: 4.9, reviews: 55, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'bathroom-accessory', name: 'Bathroom wall decor and accessory', price: 560.00, images: ['/Bathroom wall decor and accessory.jpg'], description: 'Stylish bathroom wall accessory.', longDescription: 'A stylish and functional accessory for your bathroom wall, perfect for holding towels or other items.', category: 'plumbing', rating: 4.4, reviews: 130, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'plumbing-soap-dish', name: 'soap dish', price: 500.00, images: ['/soap dish.png'], description: 'A simple and elegant soap dish.', longDescription: 'A clean and minimalist soap dish that keeps your soap dry and your sink area tidy.', category: 'plumbing', rating: 4.5, reviews: 180, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'standing-sink', name: 'standing Sink', price: 5800.00, images: ['/standing Sink.png'], description: 'A modern freestanding sink.', longDescription: 'A stylish freestanding sink that makes a statement in any bathroom. Made from high-quality ceramic.', category: 'plumbing', rating: 4.7, reviews: 65, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'square-sink', name: 'Square sink', price: 6500.00, images: ['/Square sink.jpg'], description: 'A geometric square sink.', longDescription: 'A modern sink with a sharp, geometric design. Perfect for contemporary bathrooms.', category: 'plumbing', rating: 4.8, reviews: 75, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'grey-sink', name: 'grey sink', price: 4500.00, images: ['/grey sink.png'], description: 'A stylish sink in a grey finish.', longDescription: 'A chic and modern sink in a trendy grey finish. We also offer installation services for an additional fee.', category: 'plumbing', rating: 4.6, reviews: 90, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'plumbing-square-toilet', name: 'square toilet', price: 29000.00, images: ['/square toilet.jpg'], description: 'A modern, geometric square toilet.', longDescription: 'This toilet features a bold, geometric square design for a distinctly modern bathroom. Includes a soft-close seat and efficient dual-flush system.', category: 'plumbing', rating: 4.9, reviews: 45, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'plumbing-oval-toilet', name: 'oval toilet', price: 29000.00, images: ['/oval toilet.jpg'], description: 'A classic and comfortable oval toilet.', longDescription: 'A classic oval toilet that combines timeless design with modern water-saving technology.', category: 'plumbing', rating: 4.8, reviews: 50, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'plumbing-pink-toilet', name: 'PinkOval Frencia toilet', price: 29000.00, images: ['/PinkOval Frencia toilet.jpg'], description: 'A unique pink oval frencia toilet.', longDescription: 'Add a splash of color and unique style to your bathroom with this pink oval frencia toilet.', category: 'plumbing', rating: 4.7, reviews: 30, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'toilet-designs', name: 'toilet designs', price: 2500.00, images: ['/toilet designs.jpg'], description: 'Decorative toilet seat designs.', longDescription: 'A variety of decorative toilet seat designs to add a personal touch to your bathroom.', category: 'plumbing', rating: 4.5, reviews: 120, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'black-shower-head', name: 'Black round shower head', price: 7500.00, images: ['/Black round shower head.jpg'], description: 'A sleek black round shower head.', longDescription: 'A modern, oversized round shower head in a matte black finish for a luxurious shower experience.', category: 'plumbing', rating: 4.9, reviews: 88, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'black-n-type-tap', name: 'Black n-type WaterTap', price: 6500.00, images: ['/Black n-type tap.jpg'], description: 'An elegant black n-type water tap.', longDescription: 'An elegant water tap with a unique N-type design and a stylish matte black finish.', category: 'plumbing', rating: 4.8, reviews: 92, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'black-elegant-tap', name: 'Black elegant watertap', price: 2500.00, images: ['/Black elegant watertap.jpg'], description: 'A stylish and elegant black water tap.', longDescription: 'A sleek and minimalist water tap in matte black, perfect for modern kitchens and bathrooms.', category: 'plumbing', rating: 4.7, reviews: 115, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'double-sink', name: 'Double sink with tap', price: 11000.00, images: ['/Double sink with tap.jpg'], description: 'A practical double sink with a tap.', longDescription: 'A spacious and practical double sink for your kitchen, complete with a modern tap. Made from durable stainless steel.', category: 'plumbing', rating: 4.8, reviews: 105, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
    { id: 'ppr-male-adaptor', name: 'PPR MALE ADAPTOR 50MM (half inch)', price: 280.00, images: ['/PPR MALE ADAPTOR 50MM (half inche).jpg'], description: 'A 50mm (half inch) PPR male adaptor.', longDescription: 'A high-quality 50mm (half inch) PPR male adaptor for connecting pipes to threaded fittings.', category: 'plumbing', rating: 5.0, reviews: 300, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
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
    colors: ['Black', 'White'],
  },
];

const allProducts = [...featuredProducts, ...tankProducts, ...decorProducts, ...plumbingProducts, ...legacyProducts];

const categories: Category[] = [
  { id: 'lighting-electrical', name: 'Lighting & Electrical' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'decor', name: 'Home & Decor' },
  { id: 'roofing', name: 'Roofing & Fencing' },
  { id: 'tanks', name: 'Tanks' },
  { id: 'electronics', name: 'Electronics' },
];

const users: MockUser[] = [
    { id: 'user-1', name: 'Valued Customer', email: 'customer@example.com', password: 'password123', role: 'user', signedUp: '2024-05-01T10:30:00Z', lastSeen: '2024-07-20T14:00:00Z', orders: 3, visitDuration: 15 },
    { id: 'user-2', name: 'Admin User', email: 'admin@example.com', password: 'adminpassword', role: 'admin', signedUp: '2024-04-15T09:00:00Z', lastSeen: '2024-07-21T11:20:00Z', orders: 1, visitDuration: 45 },
    { id: 'user-3', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'password123', role: 'staff', signedUp: '2024-05-10T18:45:00Z', lastSeen: '2024-07-18T20:10:00Z', orders: 5, visitDuration: 25 },
    { id: 'user-4', name: 'John Smith', email: 'john.smith@example.com', password: 'password123', role: 'user', signedUp: '2024-05-12T11:00:00Z', lastSeen: '2024-07-19T08:05:00Z', orders: 0, visitDuration: 5 },
];

const transactions: Transaction[] = [
  { id: 'txn-1', customerName: 'Valued Customer', email: 'customer@example.com', amount: 9500, date: '2024-07-20T11:00:00Z', status: 'Completed', productName: 'Oval Toilet & Ample Light' },
  { id: 'txn-2', customerName: 'Jane Doe', email: 'jane.doe@example.com', amount: 12000, date: '2024-07-19T15:30:00Z', status: 'Completed', productName: 'Solar Heater' },
  { id: 'txn-3', customerName: 'John Smith', email: 'john.smith@example.com', amount: 3300, date: '2024-07-21T09:05:00Z', status: 'Pending', productName: 'Artistic Lights' },
  { id: 'txn-4', customerName: 'New Shopper', email: 'shopper@example.com', amount: 7500, date: '2024-07-21T10:45:00Z', status: 'Failed', productName: 'Kentank 2000L' },
  { id: 'txn-5', customerName: 'Valued Customer', email: 'customer@example.com', amount: 30, date: '2024-07-18T14:20:00Z', status: 'Completed', productName: 'PPR Pipe Fittings' },
];

export async function getHomePageCategories(): Promise<HomePageCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return homePageCategories;
}

export async function getCarouselCategories(): Promise<CarouselCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return carouselCategories;
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

export async function getTankProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return tankProducts;
}

export async function getDecorProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allProducts.filter(p => p.category === 'decor');
}

export async function getPlumbingProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return allProducts.filter(p => p.category === 'plumbing');
}

export async function getUsers(): Promise<MockUser[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return users;
}

export async function getUserByEmail(email: string): Promise<MockUser | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    // In a real app, you would query your database.
    // For now, we'll check our mock user list.
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export async function getTransactions(): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return transactions;
}
