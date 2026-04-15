import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function ProductDetailPage() {
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

  async function handleDelete() {
    const confirmed = window.confirm("Delete this product?");
    if (confirmed) {
      await fetch(`${URL}?id=eq.${id}`, { method: "DELETE", headers });
      navigate("/");
    }
  }

  if (!product) return <p className="status-msg">Loading…</p>;

  return (
    <main className="app">
      <h1 className="page-title">Product Details</h1>

      <article className="product-detail">
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <div className="image-placeholder large">?</div>
        )}
        <div className="product-detail-body">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-price">DKK {product.price}</p>
          <div className="product-detail-actions">
            <Link to={`/products/${id}/update`} className="btn btn-primary">
              ✏️ Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
