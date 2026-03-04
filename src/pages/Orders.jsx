import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/orders/my");
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card">
            <p>Order ID: {order._id}</p>
            <p>Total: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <ul>
              {order.items?.map((item, index) => (
                <li key={`${order._id}-${index}`}>
                  {(item.product?.title || item.product) ?? "Product"} x {item.quantity} (${item.price})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
