import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/useAuth";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const emptyEditForm = {
  title: "",
  description: "",
  image: "",
  price: "",
  category: "",
  stock: "",
};

function Shop() {
  const { user, fetchCartCount } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState(emptyEditForm);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products || []);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      setMessage("Login first to add items to cart");
      return;
    }

    try {
      await axios.post("/cart", { productId, quantity: 1 });
      await fetchCartCount();
      setMessage("Added to cart");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add to cart");
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      title: product.title || "",
      description: product.description || "",
      image: product.image || "",
      price: product.price ?? "",
      category: product.category || "",
      stock: product.stock ?? 0,
    });
  };

  const cancelEdit = () => {
    setEditingId("");
    setEditForm(emptyEditForm);
  };

  const onEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (productId) => {
    try {
      await axios.put(`/products/${productId}`, {
        ...editForm,
        image: editForm.image || "https://via.placeholder.com/640x360?text=CampusCart",
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      });
      setMessage("Product updated");
      cancelEdit();
      await fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not update product");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      setMessage("Product deleted");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not delete product");
    }
  };

  if (loading)
    return (
      <div className="page">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="page">
        <Alert type="error">{error}</Alert>
      </div>
    );

  return (
    <div>
      <h2>Shop Products</h2>
      {message && <Alert>{message}</Alert>}
      {products.length === 0 && <p>No products available</p>}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="card product-card">
            <div style={{ position: "relative" }}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onError={(event) => {
                  event.currentTarget.src = "https://via.placeholder.com/640x400?text=No+Image";
                }}
              />
              <span className="price-badge">${product.price}</span>
            </div>
            <div className="product-body">
              <div className="product-info">
                <h4>{product.title}</h4>
                <p className="description">{product.description}</p>
                <p className="category">{product.category}</p>
                <p className="stock">{product.stock} available</p>
              </div>

              {editingId === product._id ? (
                <div className="form">
                  <input name="title" value={editForm.title} onChange={onEditChange} />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={onEditChange}
                  />
                  <input name="image" value={editForm.image} onChange={onEditChange} />
                  <input name="price" type="number" value={editForm.price} onChange={onEditChange} />
                  <input
                    name="category"
                    value={editForm.category}
                    onChange={onEditChange}
                  />
                  <input name="stock" type="number" value={editForm.stock} onChange={onEditChange} />
                  <div className="actions">
                    <button type="button" onClick={() => saveEdit(product._id)}>
                      Save
                    </button>
                    <button type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="actions">
                  <button type="button" onClick={() => addToCart(product._id)}>
                    Add to Cart
                  </button>
                  {user?.role === "admin" && (
                    <>
                      <button type="button" onClick={() => startEdit(product)}>
                        Update
                      </button>
                      <button type="button" onClick={() => deleteProduct(product._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
