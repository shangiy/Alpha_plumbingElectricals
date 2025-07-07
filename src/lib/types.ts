export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  seller: {
    name: string;
    id: string;
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface HomePageCategory {
  id: string;
  name: string;
  image: string;
}
