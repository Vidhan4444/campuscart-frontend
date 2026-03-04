import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/useAuth";

function Home() {
  const { user, fetchCartCount } = useAuth();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products?limit=4&page=1");
        setProducts(Array.isArray(data?.products) ? data.products : []);
      } catch {
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      setMessage("Please login to add items to cart.");
      return;
    }

    try {
      await axiosInstance.post("/cart", { productId, quantity: 1 });
      await fetchCartCount();
      setMessage("Added to cart");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add to cart");
    }
  };

  return (
    <div className="landing">
      <section className="hero reveal">
        <p className="eyebrow">Campus marketplace</p>
        {user ? (
          <>
            <h1>Welcome back, {user.name}. Ready to shop?</h1>
            <p>
              Browse products, manage your cart, and track your orders from one
              place.
            </p>
          </>
        ) : (
          <>
            <h1>Buy and sell essentials around your campus.</h1>
            <p>
              CampusCart helps students discover local products, add to cart quickly,
              and place orders in seconds.
            </p>
          </>
        )}
        <div className="actions">
          <Link className="cta secondary" to="/shop">
            Explore Products
          </Link>
          {user ? (
            <Link className="cta" to="/cart">
              Go to Cart
            </Link>
          ) : (
            <Link className="cta" to="/login">
              Login
            </Link>
          )}
        </div>
      </section>

      <section className="content-block reveal">
        <h2>About CampusCart</h2>
        <p>
          CampusCart is a student-focused marketplace that helps your campus
          community trade everyday essentials quickly and safely.
        </p>
      </section>

      <section className="content-block reveal">
        <h2>Why Use CampusCart</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Nearby and relevant</h3>
            <p>Find products from your own campus ecosystem.</p>
          </div>
          <div className="feature-card">
            <h3>Simple buying flow</h3>
            <p>Browse, add to cart, and order in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>Managed catalog</h3>
            <p>Admin controls keep listings cleaner and more reliable.</p>
          </div>
        </div>
      </section>

      <section className="content-block reveal">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Secure session auth</h3>
            <p>Persistent login with role-based access.</p>
          </div>
          <div className="feature-card">
            <h3>Cart and orders</h3>
            <p>Track items, totals, and order history effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>Visual product cards</h3>
            <p>Image-first catalog with clean product details.</p>
          </div>
        </div>
      </section>

      <section className="content-block reveal">
        <h2>Products</h2>
        {message && <p>{message}</p>}
        <div className="products-grid">
          {products.map((product) => (
            <article key={product._id} className="card product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onError={(event) => {
                  event.currentTarget.src = "https://via.placeholder.com/640x400?text=No+Image";
                }}
              />
              <div className="product-body">
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p className="description">{product.description}</p>
                  <p className="price">${product.price}</p>
                </div>
                <button type="button" onClick={() => addToCart(product._id)}>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
