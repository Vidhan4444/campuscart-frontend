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
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, cartCount, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">CampusCart</Link>
        <Link to="/shop">Shop</Link>
        {user?.role === "admin" && <Link to="/create-product">Create Product</Link>}
        {user && (
          <Link to="/cart" className="cart-link">
            Cart
            <span className="cart-badge">{cartCount}</span>
          </Link>
        )}
        {user && <Link to="/orders">Orders</Link>}
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
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
