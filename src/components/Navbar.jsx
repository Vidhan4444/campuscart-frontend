// import { NavLink, Link } from "react-router-dom";
// import { useState } from "react";
// import { useAuth } from "../context/useAuth";

// function Navbar() {
//   const { user, logout } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   return (
//     <nav className="nav">
//       <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
//         ☰
//       </button>
//       <div className={`nav-left ${menuOpen ? "open" : ""}`}>
//         <NavLink to="/">CampusCart</NavLink>
//         <NavLink to="/shop">Shop</NavLink>
//         {user?.role === "admin" && <NavLink to="/create-product">Create Product</NavLink>}
//         {user && <NavLink to="/cart">Cart</NavLink>}
//         {user && <NavLink to="/orders">Orders</NavLink>}
//       </div>
//       <div className="nav-right">
//         {user ? (
//           <>
//             <span>{user.name}</span>
//             <button type="button" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Signup</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, cartCount, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav">
      <button
        type="button"
        className="nav-hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <div className={`nav-links-container ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-left">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>CampusCart</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          {user?.role === "admin" && <Link to="/create-product" onClick={() => setIsMenuOpen(false)}>Create Product</Link>}
          {user && (
            <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
              Cart
              <span className="cart-badge">{cartCount}</span>
            </Link>
          )}
          {user && <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</Link>}
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <span>{user.name}</span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
