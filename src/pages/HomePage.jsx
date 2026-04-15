import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(URL, { headers });
      const data = await response.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <main className="app">
      <h1 className="page-title">All Products</h1>
      <section className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
