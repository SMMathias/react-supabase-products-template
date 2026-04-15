import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`${URL}?id=eq.${id}`, { headers });
      const data = await response.json();
      setProduct(data[0]);
    }
    loadProduct();
  }, [id]);

  async function handleSubmit(productData) {
    await fetch(`${URL}?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(productData) });
    navigate(`/products/${id}`);
  }

  if (!product) return <p className="status-msg">Loading…</p>;

  return (
    <main className="app">
      <h1 className="page-title">Update Product</h1>
      <ProductForm onSubmit={handleSubmit} productToUpdate={product} />
    </main>
  );
}
