import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id,
    title: "NEW Product",
    price: 0,
    image: "",
  });

  const URL = import.meta.env.VITE_SUPABASE_URL;
  const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`${URL}?id=eq.${id}`, {
        headers: {
          apikey: APIKEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      setProduct(data[0]);
    }
    fetchProduct();
  }, [URL, APIKEY, id]);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this product?");
    if (confirmed) {
      await fetch(`${URL}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: APIKEY,
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    }
  }

  return (
    <main className="app">
      <h1 className="page-title">Product Details</h1>
      <p className="status-msg">
        TODO (Trin 5): Implementer GET af product details med fetch.
      </p>

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
