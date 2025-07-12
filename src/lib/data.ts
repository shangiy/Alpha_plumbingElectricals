import type { Product, Category, HomePageCategory, CarouselCategory, MockUser, Transaction } from './types';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, writeBatch } from 'firebase/firestore';

const homePageCategories: HomePageCategory[] = [
    { id: 'decor', name: 'Home & Decor', image: '/decor.png' },
    { id: 'roofing', name: 'Roofing & Fencing', image: '/roof 2.png' },
    { id: 'lighting-electrical', name: 'Lighting & Electrical', image: '/electric cable.png' },
    { id: 'home-decor-2', name: 'Home & Decor', image: '/decor lighting design.png' },
    { id: 'roofing-2', name: 'Roofing & Fencing', image: '/roof 2.png' },
    { id: 'home-decor-3', name: 'Home & Decor', image: '/floor tiles.png' },
    { id: 'lighting-2', name: 'Lighting & Electrical', image: '/artistic lights.png' }
];

export const carouselCategories: CarouselCategory[] = [
  { id: 'lighting-1', name: 'Lighting & Electrical', image: '/aesthetic Light.png', href: '/lighting' },
  { id: 'plumbing-1', name: 'Plumbing Equipment', image: '/ppr joints.png', href: '/plumbing' },
  { id: 'tanks-1', name: 'Tanks', image: '/kentank 2000l.png', href: '/tanks' },
  { id: 'decor-1', name: 'Home & Decor', image: '/birds lights.png', href: '/decor' },
  { id: 'roofing-1', name: 'Roofing & Fencing', image: '/roof 2.png', href: '/roofing' },
  { id: 'lighting-2', name: 'Lighting & Electrical', image: '/Electric cable per roll.jpg', href: '/lighting' },
  { id: 'decor-2', name: 'Home & Decor', image: '/crystall chanderlier.png', href: '/decor' },
  { id: 'roofing-2', name: 'Roofing & Fencing', image: '/roof 3.png', href: '/roofing' },
  { id: 'decor-3', name: 'Home & Decor', image: '/MDF & chipboard.png', href: '/decor' },
  { id: 'lighting-3', name: 'Lighting & Electrical', image: '/classic chandelier.png', href: '/lighting' },
];

export const allProductsData: Omit<Product, 'id'>[] = [
  // This is the initial data for seeding only. The app will read from Firestore.
  { name: 'Ample Light', price: 2500, images: ['/Ample Light.png'], description: 'A beautiful and bright ample light.', longDescription: 'A beautiful and bright ample light, perfect for any room in your house.', category: 'lighting-electrical', rating: 4.5, reviews: 10, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, barcode: 'ALPHA-ELEC-001', colors: ['White', 'Silver'], isFeatured: true },
  { name: 'Artistic Lights', price: 3300, images: ['/exquisite chandelier.jpg'], description: 'Unique and stylish artistic lights.', longDescription: 'A collection of unique and stylish artistic lights to make a statement in any room.', category: 'lighting-electrical', rating: 4.6, reviews: 15, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, isFeatured: true },
  { name: 'Electric cable', price: 3000, images: ['/Electric cable per roll.jpg'], description: 'High-quality electric wiring cable.', longDescription: 'High-quality and durable electric wiring cable, available in various gauges for your needs.', category: 'lighting-electrical', rating: 4.9, reviews: 50, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, colors: ['Black', 'Red', 'Blue', 'Green'], isFeatured: true },
  { name: 'WarmLight wall bracket', price: 1900, images: ['/WarmLight wall bracket.jpg'], description: 'An elegant warm light wall bracket.', longDescription: 'An elegant warm light wall bracket that provides a cozy and inviting ambiance.', category: 'lighting-electrical', rating: 4.5, reviews: 22, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, colors: ['Silver'], isFeatured: true },
  { name: 'Kentank 2000L', price: 15000, images: ['/kentank 2000l.png'], description: 'A durable 2000L Kentank water tank.', longDescription: 'A durable 2000L Kentank water tank, ideal for domestic water storage. Made from high-quality food-grade material.', category: 'tanks', rating: 4.7, reviews: 45, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, colors: ['Black', 'Green'] },
  { name: 'Kentank 3000L', price: 10000, images: ['/kentanks 3000L.png'], description: 'A large 3000L Kentank water tank.', longDescription: 'A large 3000L Kentank water tank, perfect for residential or commercial use. UV-stabilized for long life.', category: 'tanks', rating: 4.8, reviews: 30, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, colors: ['Black', 'Green'] },
  { name: 'Water Tank', price: 6500, images: ['/cuboidTank.PNG'], description: 'A space-saving cuboid water tank.', longDescription: 'A space-saving cuboid water tank, designed for areas with limited space. Easy to install and maintain.', category: 'tanks', rating: 4.5, reviews: 20, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, colors: ['White'] },
  { name: 'Septic Tank', price: 20000, images: ['/septic Tank.png'], description: 'A reliable and robust septic tank.', longDescription: 'A reliable and robust septic tank for effective wastewater management. Built to last with high-strength materials.', category: 'tanks', rating: 4.9, reviews: 55, seller: { name: 'Alpha Electricals', id: 'seller-alpha' }, colors: ['Black'] },
  { name: 'Reservoir Tank', price: 5000, images: ['/plastic-tank.png'], description: 'A versatile plastic reservoir tank.', longDescription: 'A versatile plastic reservoir tank for various water storage needs. Lightweight and corrosion-resistant.', category: 'tanks', rating: 4.4, reviews: 15, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Top Tank 1500L', price: 4500, images: ['/top tank 1500L.png'], description: 'A compact 1500L Top Tank.', longDescription: 'A compact 1500L Top Tank, suitable for smaller households. Made with durable, high-quality plastic.', category: 'tanks', rating: 4.6, reviews: 28, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Tank 2000L', price: 5000, images: ['/top tank.png'], description: 'A standard 2000L Top Tank.', longDescription: 'A standard 2000L Top Tank offering great value and reliability for your water storage requirements.', category: 'tanks', rating: 4.7, reviews: 35, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Rainwater Harvesting Tank', price: 8000, images: ['/rainwater-tank.png'], description: 'Tank designed for rainwater harvesting.', longDescription: 'An eco-friendly solution for water conservation. This tank is specifically designed for efficient rainwater harvesting.', category: 'tanks', rating: 4.8, reviews: 40, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Golden Chandelier', price: 3500, images: ['/golden chandelier.png'], description: 'An elegant golden chandelier for a luxurious touch.', longDescription: 'An elegant golden chandelier for a luxurious touch. Perfect for dining rooms, living rooms, and grand entryways. Features high-quality crystals and a durable gold-finish frame.', category: 'decor', rating: 4.8, reviews: 22, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Rugged Chandelier', price: 5000, images: ['/rugged chandelier.png'], description: 'A stylish rugged chandelier with a modern design.', longDescription: 'A stylish rugged chandelier with a modern design. Its unique industrial look adds character to any space. Made with high-quality materials for longevity.', category: 'decor', rating: 4.7, reviews: 19, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Decorative Square Lights', price: 2800, images: ['/square lights.png'], description: 'Modern and sleek decorative square lights.', longDescription: 'Modern and sleek decorative square lights that provide a minimalist aesthetic. Energy-efficient LED technology ensures bright light with low power consumption.', category: 'decor', rating: 4.6, reviews: 31, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Birds Lights', price: 1900, images: ['/birds lights.png'], description: 'Whimsical bird-shaped decorative lights.', longDescription: 'Add a touch of nature and whimsy to your room with these charming bird-shaped lights. Perfect for nurseries, bedrooms, or any space that needs a creative flair.', category: 'decor', rating: 4.9, reviews: 40, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Pinkish Sink', price: 3000, images: ['/pinkish sink.png'], description: 'A chic and modern pinkish sink.', longDescription: 'Make a bold statement in your bathroom with this chic and modern pinkish sink. Made from high-quality ceramic, it is both durable and stylish.', category: 'decor', rating: 4.5, reviews: 15, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Bathroom Makeover Sink', price: 7500, images: ['/Bathroom makeOver Sink.png'], description: 'Complete sink unit for a bathroom makeover.', longDescription: 'A complete sink and vanity unit to instantly upgrade your bathroom. Includes a modern basin, faucet, and storage cabinet. Easy to install.', category: 'decor', rating: 4.8, reviews: 25, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Monkey Lights', price: 4000, images: ['/monkey lights.png'], description: 'Playful and unique monkey-themed lights.', longDescription: 'Bring a sense of fun and adventure to your decor with these playful monkey-themed lights. A great conversation starter and a unique piece of functional art.', category: 'decor', rating: 4.7, reviews: 18, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Golden Stripe Chandelier', price: 8000, images: ['/Golden stripe Chandelier.jpg'], description: 'A luxurious chandelier with golden stripes.', longDescription: 'This luxurious chandelier features a beautiful design with golden stripes, creating a stunning visual effect. It is the perfect centerpiece for a sophisticated room.', category: 'decor', rating: 4.9, reviews: 30, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'BlackMate Golden Chandelier', price: 8500, images: ['/BlackMate golden Chandelier.jpg'], description: 'Elegant black matte and golden chandelier.', longDescription: 'Combining black matte and golden finishes, this chandelier offers a contemporary and elegant look. Its high-quality construction ensures it will be a lasting addition to your home.', category: 'decor', rating: 4.8, reviews: 28, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Wall Lights', price: 2000, images: ['/Wall lights.jpg'], description: 'Stylish and modern wall lights for any room.', longDescription: 'These stylish and modern wall lights provide excellent ambient lighting and can complement a variety of decor styles. Energy-efficient and easy to install.', category: 'decor', rating: 4.6, reviews: 35, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Modern Soap Dish', price: 1500, images: ['/soap dish.png'], description: 'A sleek and modern soap dish for your bathroom.', longDescription: 'Keep your soap dry and your counter clean with this sleek and modern soap dish. Its minimalist design fits perfectly in any contemporary bathroom.', category: 'decor', rating: 4.5, reviews: 50, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Round Brown Frencia Countertop', price: 5500, images: ['/Round brown frencia countertop.jpg'], description: 'A beautiful round brown frencia countertop sink.', longDescription: 'This countertop sink features a beautiful round brown frencia design, adding a touch of rustic elegance to your bathroom. Made from durable, high-quality material.', category: 'decor', rating: 4.7, reviews: 21, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Golden Layers Chandelier', price: 4000, images: ['/golden layers.jpg'], description: 'A stunning chandelier with golden layers.', longDescription: 'This stunning chandelier features multiple golden layers that create a captivating light effect. A perfect statement piece for modern and classic interiors.', category: 'decor', rating: 4.8, reviews: 19, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'PinkOval Frencia Toilet', price: 8500, images: ['/PinkOval Frencia toilet.jpg'], description: 'A unique pink oval frencia toilet.', longDescription: 'Add a splash of color and unique style to your bathroom with this pink oval frencia toilet. Combines a distinctive look with modern, water-saving functionality.', category: 'decor', rating: 4.6, reviews: 12, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Designer Single-Unit Toilet', price: 29500, images: ['/Designer singleUnit toilet.jpg'], description: 'A high-end designer single-unit toilet.', longDescription: 'Experience luxury with this high-end designer single-unit toilet. Its seamless design and premium features offer superior comfort and performance.', category: 'decor', rating: 5, reviews: 8, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Striped Chandelier', price: 8000, images: ['/Striped Chandelier.jpg'], description: 'A modern chandelier with a striped design.', longDescription: 'This modern chandelier features a unique striped design that makes it a focal point in any room. Provides ample lighting while being a work of art.', category: 'decor', rating: 4.7, reviews: 14, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Decor Large Chandelier', price: 14500, images: ['/Decor large Chandelier.jpg'], description: 'A large and impressive decorative chandelier.', longDescription: 'Make a grand statement with this large decorative chandelier. Its intricate design and impressive size are perfect for spaces with high ceilings.', category: 'decor', rating: 4.9, reviews: 20, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Classic Chandelier', price: 2500, images: ['/classic chandelier.png'], description: 'A timeless and classic chandelier.', longDescription: 'This timeless chandelier brings classic elegance to any home. Its graceful design and warm light create a welcoming atmosphere.', category: 'decor', rating: 4.6, reviews: 45, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Stylish Mirror', price: 2000, images: ['/Stylish mirror.jpg'], description: 'A stylish mirror to enhance your decor.', longDescription: 'Enhance your decor with this stylish mirror. Its modern frame and high-quality reflection make it a perfect addition to any room, from entryways to bathrooms.', category: 'decor', rating: 4.5, reviews: 33, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: '5-Lamp Chandelier General', price: 5100, images: ['/5 Lamp Chandelier General.png'], description: 'A general-purpose 5-lamp chandelier.', longDescription: 'A versatile 5-lamp chandelier that provides ample light and fits well in a variety of settings. A practical and stylish lighting solution.', category: 'decor', rating: 4.7, reviews: 28, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Hexagonal Decor Light', price: 3800, images: ['/hexagonal decor light.jpg'], description: 'A modern hexagonal decorative light fixture.', longDescription: 'This modern decorative light features a trendy hexagonal design. It can be used alone or grouped together to create a custom lighting installation.', category: 'decor', rating: 4.8, reviews: 15, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Round Smart Mirror', price: 4500, images: ['/Round smart mirror.jpg'], description: 'A round smart mirror with LED lighting.', longDescription: 'Upgrade your bathroom with this round smart mirror. It features integrated LED lighting with adjustable brightness and an anti-fog function.', category: 'decor', rating: 4.9, reviews: 25, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Stunning Mirror', price: 1000, images: ['/Stunning mirror.jpg'], description: 'A stunning mirror with a unique frame.', longDescription: 'This stunning mirror features a unique and eye-catching frame that makes it a piece of wall art. Perfect for adding a decorative touch to any space.', category: 'decor', rating: 4.7, reviews: 30, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Ceiling 3-Mode Light', price: 6500, images: ['/Ceiling 3mode light.jpg'], description: 'A ceiling light with 3 different light modes.', longDescription: 'This versatile ceiling light offers three different light modes (e.g., warm, cool, and neutral) to suit any mood or occasion. Sleek, modern, and energy-efficient.', category: 'decor', rating: 4.8, reviews: 22, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Square Toilet', price: 29000, images: ['/square toilet.jpg'], description: 'A modern, geometric square toilet.', longDescription: 'This toilet features a bold, geometric square design for a distinctly modern bathroom. Includes a soft-close seat and efficient dual-flush system.', category: 'decor', rating: 4.9, reviews: 10, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Designer Sink', price: 3500, images: ['/Designer sink.jpg'], description: 'A designer sink with a unique shape.', longDescription: 'This designer sink stands out with its unique shape and high-quality finish. It serves as a functional sculpture for your bathroom countertop.', category: 'decor', rating: 4.7, reviews: 18, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Plumbing Pipe', price: 200, images: ['/ppr pipes.png'], description: 'High-quality plumbing pipes.', longDescription: 'Durable and reliable plumbing pipes suitable for a variety of residential and commercial applications. Available in multiple sizes.', category: 'plumbing', rating: 4.8, reviews: 80, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'PPR elbows', price: 100, images: ['/pipe elbows.png'], description: 'Durable PPR elbows for pipe fitting.', longDescription: 'High-quality PPR elbows for changing pipe direction. Designed for a secure, leak-proof fit.', category: 'plumbing', rating: 4.9, reviews: 150, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Tee PPR connector', price: 50, images: ['/Tee PPR connector.png'], description: 'A reliable Tee PPR connector.', longDescription: 'A T-shaped connector for joining three pipes. Made from high-grade PPR for durability and heat resistance.', category: 'plumbing', rating: 4.9, reviews: 200, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Plumbing Valve', price: 1500, images: ['/ppr pipe fittings.png'], description: 'A robust valve for plumbing systems.', longDescription: 'A durable plumbing valve to control water flow. Features easy operation and a long service life.', category: 'plumbing', rating: 4.7, reviews: 95, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'PPR pipe roll', price: 8000, images: ['/100m PPR roll.png'], description: 'A 100m roll of PPR pipe.', longDescription: 'A 100-meter roll of flexible and durable PPR pipe, suitable for large-scale plumbing installations.', category: 'plumbing', rating: 4.8, reviews: 60, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'HDPE 100M PIPE PN6 50mm', price: 12000, images: ['/HDPE 100M PIPE.jpg'], description: '100m of 50mm HDPE pipe.', longDescription: 'High-density polyethylene pipe, 100 meters long and 50mm in diameter, suitable for high-pressure applications.', category: 'plumbing', rating: 4.9, reviews: 40, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'PVC Waste Pipes 6 Inches', price: 3500, images: ['/PVC Waste Pipes 6 In .jpg'], description: '6-inch PVC pipes for waste management.', longDescription: 'Durable 6-inch PVC pipes designed for waste and drainage systems. Resistant to chemicals and corrosion.', category: 'plumbing', rating: 4.6, reviews: 70, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Danco Hosepipe', price: 2000, images: ['/Danco Hosepipe.jpg'], description: 'A flexible and durable Danco hosepipe.', longDescription: 'A high-quality hosepipe from Danco, perfect for gardening and other outdoor uses. Kink-resistant and built to last.', category: 'plumbing', rating: 4.5, reviews: 85, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Pillar Water tap', price: 1500, images: ['/Pillar taps.jpg'], description: 'A classic pillar water tap.', longDescription: 'A classic and elegant pillar tap with a chrome finish. Easy to install and use, suitable for any bathroom or kitchen.', category: 'plumbing', rating: 4.7, reviews: 110, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Sensor taps with On Off touchpad', price: 8000, images: ['/Sensor taps with On Off touchpad.Jpg'], description: 'Modern sensor taps with a touchpad.', longDescription: 'A touchless sensor tap for improved hygiene. Features a convenient on/off touchpad for manual operation.', category: 'plumbing', rating: 4.9, reviews: 55, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Bathroom wall decor and accessory', price: 560, images: ['/Bathroom wall decor and accessory.jpg'], description: 'Stylish bathroom wall accessory.', longDescription: 'A stylish and functional accessory for your bathroom wall, perfect for holding towels or other items.', category: 'plumbing', rating: 4.4, reviews: 130, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'standing Sink', price: 5800, images: ['/standing Sink.png'], description: 'A modern freestanding sink.', longDescription: 'A stylish freestanding sink that makes a statement in any bathroom. Made from high-quality ceramic.', category: 'plumbing', rating: 4.7, reviews: 65, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Square sink', price: 6500, images: ['/Square sink.jpg'], description: 'A geometric square sink.', longDescription: 'A modern sink with a sharp, geometric design. Perfect for contemporary bathrooms.', category: 'plumbing', rating: 4.8, reviews: 75, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'grey sink', price: 4500, images: ['/grey sink.png'], description: 'A stylish sink in a grey finish.', longDescription: 'A chic and modern sink in a trendy grey finish. We also offer installation services for an additional fee.', category: 'plumbing', rating: 4.6, reviews: 90, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'toilet designs', price: 2500, images: ['/toilet designs.jpg'], description: 'Decorative toilet seat designs.', longDescription: 'A variety of decorative toilet seat designs to add a personal touch to your bathroom.', category: 'plumbing', rating: 4.5, reviews: 120, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Black round shower head', price: 7500, images: ['/Black round shower head.jpg'], description: 'A sleek black round shower head.', longDescription: 'A modern, oversized round shower head in a matte black finish for a luxurious shower experience.', category: 'plumbing', rating: 4.9, reviews: 88, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Black n-type WaterTap', price: 6500, images: ['/Black n-type tap.jpg'], description: 'An elegant black n-type water tap.', longDescription: 'An elegant water tap with a unique N-type design and a stylish matte black finish.', category: 'plumbing', rating: 4.8, reviews: 92, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Black elegant watertap', price: 2500, images: ['/Black elegant watertap.jpg'], description: 'A stylish and elegant black water tap.', longDescription: 'A sleek and minimalist water tap in matte black, perfect for modern kitchens and bathrooms.', category: 'plumbing', rating: 4.7, reviews: 115, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Double sink with tap', price: 11000, images: ['/Double sink with tap.jpg'], description: 'A practical double sink with a tap.', longDescription: 'A spacious and practical double sink for your kitchen, complete with a modern tap. Made from durable stainless steel.', category: 'plumbing', rating: 4.8, reviews: 105, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'PPR MALE ADAPTOR 50MM (half inch)', price: 280, images: ['/PPR MALE ADAPTOR 50MM (half inche).jpg'], description: 'A 50mm (half inch) PPR male adaptor.', longDescription: 'A high-quality 50mm (half inch) PPR male adaptor for connecting pipes to threaded fittings.', category: 'plumbing', rating: 5, reviews: 300, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  // Roofing Products
  { name: 'Ironsheet Mabati', price: 1200, images: ['/Ironsheet mabati.png'], description: 'Durable ironsheet mabati for roofing.', longDescription: 'High-quality, galvanized ironsheet mabati designed to withstand harsh weather conditions. Available per meter.', category: 'roofing', rating: 4.8, reviews: 150, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Roofing Nails', price: 300, images: ['/Roofing Nails.png'], description: 'Pack of galvanized roofing nails.', longDescription: 'A pack of high-quality, galvanized roofing nails with a waterproof seal to ensure a secure and long-lasting roof.', category: 'roofing', rating: 4.9, reviews: 250, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Roof Ridges', price: 800, images: ['/Roof ridges.png'], description: 'Protective ridges for roofing.', longDescription: 'Protective roof ridges to cover the apex of the roof, preventing water leakage and providing a finished look.', category: 'roofing', rating: 4.7, reviews: 120, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'MDF & Chipboard', price: 5400, images: ['/MDF & chipboard.png'], description: 'Versatile MDF and chipboard sheets.', longDescription: 'High-quality MDF and chipboard sheets suitable for a variety of construction and furniture-making applications.', category: 'roofing', rating: 4.6, reviews: 95, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Welding Rods', price: 2500, images: ['/welding rods.png'], description: 'A bundle of all-purpose welding rods.', longDescription: 'A bundle of high-quality, all-purpose welding rods designed for strong and reliable welds in various construction projects.', category: 'roofing', rating: 4.8, reviews: 180, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Stylish Granites', price: 1500, images: ['/stylish granites.png'], description: 'Stylish granites for countertops.', longDescription: 'Elegant and durable granite slabs, perfect for creating stunning kitchen countertops and bathroom vanities. Available per square meter.', category: 'roofing', rating: 4.9, reviews: 75, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Easy Installation Fence', price: 4500, images: ['/green fencing.png'], description: 'Easy-to-install fencing solution.', longDescription: 'A complete fencing solution that is easy to install. Ideal for garden perimeters and property boundaries. Available per roll.', category: 'roofing', rating: 4.6, reviews: 65, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Manhole Covers', price: 2500, images: ['/manhole covers.png'], description: 'Heavy-duty manhole covers.', longDescription: 'Heavy-duty and secure manhole covers for various applications. Designed for durability and safety.', category: 'roofing', rating: 4.8, reviews: 90, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Gutter Systems', price: 1800, images: ['/rainwater gutters.png'], description: 'Complete rainwater gutter systems.', longDescription: 'Efficient and durable gutter systems to manage rainwater and protect your building\'s foundation. Includes all necessary fittings.', category: 'roofing', rating: 4.7, reviews: 110, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Dynamic Sink', price: 3200, images: ['/dynamic sink.png'], description: 'A dynamic and modern utility sink.', longDescription: 'A versatile and modern utility sink, suitable for laundry rooms, workshops, or outdoor kitchens. Made from high-impact materials.', category: 'roofing', rating: 4.5, reviews: 50, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Durable Countertops', price: 2000, images: ['/durable countertops.png'], description: 'Highly durable countertops for various uses.', longDescription: 'Highly durable and scratch-resistant countertops, perfect for high-traffic areas like kitchens and workshops. Available per square meter.', category: 'roofing', rating: 4.8, reviews: 85, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Yale Door Locks 4L-22934', price: 9095, images: ['/yale door locks  4L-22934-LS.png'], description: 'High-security Yale door locks.', longDescription: 'Ensure your property is secure with this high-security Yale door lock, model 4L-22934. Known for its reliability and anti-pick features.', category: 'roofing', rating: 4.9, reviews: 130, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Union Locks 4L-22934-LS', price: 9095, images: ['/4L-22934-LS union.png'], description: 'Dependable Union brand door locks.', longDescription: 'A dependable and robust Union door lock, model 4L-22934-LS. Provides excellent security for residential and commercial properties.', category: 'roofing', rating: 4.9, reviews: 125, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  // Lighting & Electrical
  { name: 'Aesthetic Lights', price: 1200, images: ['/aesthetic Light.png'], description: 'Beautiful aesthetic lights.', longDescription: 'Beautiful aesthetic lights to create the perfect mood in any room.', category: 'lighting-electrical', rating: 4.7, reviews: 40, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Crystal Chandelier', price: 1500, images: ['/crystall chanderlier.png'], description: 'Elegant crystal chandelier.', longDescription: 'An elegant crystal chandelier that adds a touch of class to your home.', category: 'lighting-electrical', rating: 4.8, reviews: 35, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Curvy Blue Light', price: 3500, images: ['/curvy blue light.jpg'], description: 'A modern ceiling light with a curvy design.', longDescription: 'A modern ceiling light with a unique curvy blue design.', category: 'lighting-electrical', rating: 4.6, reviews: 25, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'Masai Cable Flex 4.0mm', price: 375, images: ['/masai cable Flex cable.png'], description: '4.0mm Masai flex cable.', longDescription: 'High-quality 4.0mm flex cable from Masai for various electrical applications.', category: 'lighting-electrical', rating: 4.9, reviews: 150, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'IFLUX Water Heater Switch (Gold)', price: 555, images: ['/IFLUX WATER HEATER SWITCH 45 Amp (gold).png'], description: '45 Amp water heater switch in gold.', longDescription: 'A stylish and reliable 45 Amp water heater switch from IFLUX in a gold finish.', category: 'lighting-electrical', rating: 4.8, reviews: 75, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: '2FT Vellmax Flat Tube 25w', price: 490, images: ['/2FT vellmax Flat Tube 25w.png'], description: 'A 2ft, 25w flat tube light.', longDescription: 'A 2-foot, 25-watt flat tube light from Vellmax, providing bright and efficient lighting.', category: 'lighting-electrical', rating: 4.7, reviews: 90, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'TLAC Electric Booster Pump DCM190', price: 19800, images: ['/TLAC ELECTRIC BOOSTER PUMP DCM190.jpg'], description: 'A powerful electric booster pump.', longDescription: 'The TLAC DCM190 electric booster pump ensures consistent water pressure throughout your home.', category: 'lighting-electrical', rating: 4.9, reviews: 60, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: '3 Gang IFLUX Flour Series Switch', price: 360, images: ['/3 GANG IFLUX  FLOUR SERIES SWH3G2-14.png'], description: 'A 3-gang switch from the IFLUX Flour series.', longDescription: 'A stylish and durable 3-gang switch from the IFLUX Flour series, model SWH3G2-14.', category: 'lighting-electrical', rating: 4.8, reviews: 120, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'IFLUX 2 Gang Switch', price: 250, images: ['/IFLUX 2 GANG SWITCH.png'], description: 'A 2-gang switch from IFLUX.', longDescription: 'A reliable and easy-to-install 2-gang switch from IFLUX.', category: 'lighting-electrical', rating: 4.8, reviews: 130, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: '45A IFLUX Water Heater Switch', price: 415, images: ['/45A IFLUX WATER HEATER SWITCH.png'], description: 'A 45A water heater switch.', longDescription: 'A standard 45A water heater switch from IFLUX, built for safety and durability.', category: 'lighting-electrical', rating: 4.9, reviews: 100, seller: { name: 'Alpha Electricals', id: 'seller-alpha' } },
  { name: 'IFLUX 1 Gang Switch', price: 150, images: ['/IFLUX 1 GANG SWITCH.png'], description: 'A 1-gang switch from IFLUX.', longDescription: 'A simple and effective 1-gang switch from IFLUX.', category: 'lighting-electrical', rating: 4.8, reviews: 200, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: 'Tronic 1 Gang Switch', price: 250, images: ['/Tronic 1gang switch.jpg'], description: 'A 1-gang switch from Tronic.', longDescription: 'A high-quality 1-gang switch from Tronic, known for its sleek design.', category: 'lighting-electrical', rating: 4.7, reviews: 180, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: 'Tronic 2 Gang Switch', price: 360, images: ['/Tronic 2 gang switch.jpg'], description: 'A 2-gang switch from Tronic.', longDescription: 'A durable and stylish 2-gang switch from Tronic.', category: 'lighting-electrical', rating: 4.7, reviews: 160, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: 'Tronic 3 Gang Switch', price: 450, images: ['/Tronic 3Gang switch.jpg'], description: 'A 3-gang switch from Tronic.', longDescription: 'A versatile 3-gang switch from Tronic, perfect for any room.', category: 'lighting-electrical', rating: 4.7, reviews: 140, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: 'Tronic 4 Gang Switch', price: 150, images: ['/Tronic 4 gang switch.jpg'], description: 'A 4-gang switch from Tronic.', longDescription: 'A 4-gang switch from Tronic, offering control over multiple light sources.', category: 'lighting-electrical', rating: 4.7, reviews: 125, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: '4FT Earthrod', price: 280, images: ['/4FT EARTHROD.jpg'], description: 'A 4-foot copper earthrod.', longDescription: 'A 4-foot copper earthrod for effective electrical grounding.', category: 'lighting-electrical', rating: 4.9, reviews: 250, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: 'Black IFLUX 3 Gang Switch', price: 360, images: ['/3 GANG IFLUX  FLOUR SERIES SWH3G2-14.jpg'], description: 'A 3-gang switch in black.', longDescription: 'A sleek, black 3-gang switch from the IFLUX Flour series.', category: 'lighting-electrical', rating: 4.8, reviews: 110, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: '300w New Streetlight 58300', price: 8000, images: ['/300w New Streetlight 58300 .jpg'], description: 'A 300W new model streetlight.', longDescription: 'A powerful 300W streetlight, model 58300, for excellent outdoor illumination.', category: 'lighting-electrical', rating: 4.9, reviews: 80, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: '300W Optonica Gold Streetlight', price: 8970, images: ['/300W Optonica Gold Street.jpg'], description: 'A 300W gold streetlight from Optonica.', longDescription: 'A high-performance 300W streetlight from Optonica with a stylish gold finish.', category: 'lighting-electrical', rating: 4.9, reviews: 70, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
  { name: '300W Optonica Silver Streetlight', price: 8970, images: ['/300W Optonica Silver Street.jpg'], description: 'A 300W silver streetlight from Optonica.', longDescription: 'A durable and efficient 300W streetlight from Optonica with a sleek silver finish.', category: 'lighting-electrical', rating: 4.9, reviews: 65, seller: { name: 'Alpha Electricals', 'id': 'seller-alpha' } },
];
let productsCache: Product[] | null = null;
let seeded = false;

// Function to seed products into Firestore
export async function seedProducts() {
    if (seeded) return;
    try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        if (snapshot.empty) {
            console.log("Seeding products into Firestore...");
            const batch = writeBatch(db);
            allProductsData.forEach(productData => {
                const docRef = doc(productsCollection); // Automatically generate new ID
                batch.set(docRef, productData);
            });
            await batch.commit();
            console.log("Seeding complete.");
        }
        seeded = true;
    } catch (error) {
        console.error("Error seeding products: ", error);
        // This might happen due to security rules, we'll rely on local data.
        seeded = true;
    }
}

// Function to get all products
export async function getProducts(): Promise<Product[]> {
  if (productsCache) {
    return productsCache;
  }
  try {
    await seedProducts(); // Ensure seeding has been attempted
    const productsCollection = collection(db, "products");
    const productSnapshot = await getDocs(productsCollection);
    
    if (productSnapshot.empty) {
        // If Firestore is empty (e.g., due to security rules blocking reads), use local data
        console.warn("Firestore is empty or inaccessible. Falling back to local product data.");
        const localProducts = allProductsData.map((p, index) => ({ id: `local-${index}`, ...p }));
        productsCache = localProducts;
        return localProducts;
    }

    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    
    productsCache = productList;
    return productList;

  } catch (error) {
    console.error("Failed to fetch products from Firestore, falling back to local data.", error);
    // Fallback to local data if there's any error
    const localProducts = allProductsData.map((p, index) => ({ id: `local-${index}`, ...p }));
    productsCache = localProducts;
    return localProducts;
  }
}

// Function to get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // First, try to find it in the cached list of all products
  const products = await getProducts();
  const productFromCache = products.find(p => p.id === id);
  if (productFromCache) {
      return productFromCache;
  }

  // If not in cache (e.g., it's a new product and cache isn't updated), try fetching directly
  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
       // Final fallback to local data if direct fetch fails
       return allProductsData.map((p, index) => ({...p, id: `local-${index}`})).find(p => p.id === id);
    }
  } catch(error) {
      console.error(`Failed to fetch product ${id} from Firestore, falling back to local data.`, error);
      return allProductsData.map((p, index) => ({...p, id: `local-${index}`})).find(p => p.id === id);
  }
}

// Function to get all categories
export async function getCategories(): Promise<Category[]> {
  // This can be expanded to fetch from a 'categories' collection in Firestore
  return [
    { id: 'tanks', name: 'Tanks' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'lighting-electrical', name: 'Lighting & Electrical' },
    { id: 'decor', name: 'Home & Decor' },
    { id: 'roofing', name: 'Roofing & Construction' },
  ];
}


// --- Mock User and Transaction Data ---
const mockUsers: MockUser[] = [
    { id: 'user-1', name: 'Alice Johnson', username: 'alicej', email: 'alice@example.com', password: 'password123', role: 'admin', signedUp: '2023-01-15T10:00:00Z', lastSeen: '2023-07-20T14:30:00Z', orders: 5, visitDuration: 15 },
    { id: 'user-2', name: 'Bob Smith', username: 'bobsmith', email: 'bob@example.com', password: 'password123', role: 'staff', signedUp: '2023-02-20T11:00:00Z', lastSeen: '2023-07-21T09:00:00Z', orders: 2, visitDuration: 8 },
    { id: 'user-3', name: 'Charlie Brown', username: 'charlieb', email: 'charlie@example.com', password: 'password123', role: 'user', signedUp: '2023-03-10T12:00:00Z', lastSeen: '2023-07-19T18:00:00Z', orders: 1, visitDuration: 25 },
    { id: 'user-4', name: 'Diana Prince', username: 'dianap', email: 'diana@example.com', password: 'password123', role: 'user', signedUp: '2023-04-05T13:00:00Z', lastSeen: '2023-07-21T11:45:00Z', orders: 10, visitDuration: 12 },
    { id: 'user-5', name: 'Eve Adams', username: 'evea', email: 'eve@example.com', password: 'password123', role: 'user', signedUp: '2023-05-25T14:00:00Z', lastSeen: '2023-07-18T20:15:00Z', orders: 0, visitDuration: 5 },
];

const mockTransactions: Transaction[] = [
    { id: 'txn-1', customerName: 'Alice Johnson', email: 'alice@example.com', amount: 15000, date: '2023-07-18T10:30:00Z', status: 'Completed', productName: 'Kentank 2000L' },
    { id: 'txn-2', customerName: 'Bob Smith', email: 'bob@example.com', amount: 3300, date: '2023-07-19T14:00:00Z', status: 'Completed', productName: 'Artistic Lights' },
    { id: 'txn-3', customerName: 'Charlie Brown', email: 'charlie@example.com', amount: 8000, date: '2023-07-20T11:00:00Z', status: 'Pending', productName: 'Rainwater Harvesting Tank' },
    { id: 'txn-4', customerName: 'Diana Prince', email: 'diana@example.com', amount: 1200, date: '2023-07-20T15:45:00Z', status: 'Completed', productName: 'Ironsheet Mabati' },
    { id: 'txn-5', customerName: 'Alice Johnson', email: 'alice@example.com', amount: 500, date: '2023-07-21T09:15:00Z', status: 'Failed', productName: 'Roofing Nails' },
];

export async function getUsers(): Promise<MockUser[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockUsers), 500));
}

export async function getUserByEmail(email: string): Promise<MockUser | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(mockUsers.find(u => u.email === email)), 200));
}

export async function signUpUser(userData: Pick<MockUser, 'name' | 'username' | 'email' | 'password'>): Promise<MockUser> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const existing = mockUsers.find(u => u.email === userData.email);
            if (existing) {
                reject(new Error("An account with this email already exists."));
                return;
            }
            const newUser: MockUser = {
                id: `user-${mockUsers.length + 1}`,
                role: 'user',
                signedUp: new Date().toISOString(),
                lastSeen: new Date().toISOString(),
                orders: 0,
                visitDuration: 0,
                ...userData,
            };
            mockUsers.push(newUser);
            resolve(newUser);
        }, 300);
    });
}

export async function getTransactions(): Promise<Transaction[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockTransactions), 500));
}
