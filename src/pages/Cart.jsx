import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/useAuth";

function Cart() {
  const navigate = useNavigate();
  const { fetchCartCount } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadCart = async () => {
    try {
      const { data } = await axiosInstance.get("/cart");
      setCart(data?.items ? data : { items: [] });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load cart");
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = useMemo(
    () =>
      cart.items.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + price * item.quantity;
      }, 0),
    [cart]
  );

  const removeItem = async (productId) => {
    try {
      await axiosInstance.delete("/cart/item", { data: { productId } });
      await Promise.all([loadCart(), fetchCartCount()]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not remove item");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const nextQty = Number(quantity);
    if (!Number.isInteger(nextQty) || nextQty < 1) {
      return;
    }

    try {
      // Backend has add/remove endpoints only, so replace by remove + add with desired quantity.
      await axiosInstance.delete("/cart/item", { data: { productId } });
      await axiosInstance.post("/cart", { productId, quantity: nextQty });
      await Promise.all([loadCart(), fetchCartCount()]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not update quantity");
    }
  };

  const placeOrder = async () => {
    try {
      await axiosInstance.post("/orders");
      setCart({ items: [] });
      await fetchCartCount();
      navigate("/orders");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not place order");
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.product?._id} className="card cart-item">
              <img
                src={item.product?.image}
                alt={item.product?.title}
                className="cart-item-image"
                onError={(event) => {
                  event.currentTarget.src = "https://via.placeholder.com/320x220?text=No+Image";
                }}
              />
              <div className="cart-item-content">
                <h4>{item.product?.title}</h4>
                <p>Price: ${item.product?.price}</p>
                <label htmlFor={`qty-${item.product?._id}`}>Quantity</label>
                <input
                  id={`qty-${item.product?._id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.product?._id, event.target.value)}
                />
                <button type="button" onClick={() => removeItem(item.product?._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <p>Total: ${total.toFixed(2)}</p>
          <button type="button" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
