import { getProducts, getCategories } from '@/lib/data';
import ProductList from '@/components/products/ProductList';

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList products={products} categories={categories} />
    </div>
  );
}
