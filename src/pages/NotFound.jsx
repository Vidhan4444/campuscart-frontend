import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1>404</h1>
      <p>Page not found</p>

      <Link to="/">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;