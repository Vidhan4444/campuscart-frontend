import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    stock: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0),
      };
      const { data } = await axios.post("/products", payload);
      setMessage(data.message || "Product created");
      setForm({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
        stock: "",
      });
      navigate("/shop");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      {message && <Alert>{message}</Alert>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        min="0"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        min="0"
        value={form.stock}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}

export default CreateProduct;
