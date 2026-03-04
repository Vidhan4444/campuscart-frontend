import React from "react";

function Alert({ type = "success", children }) {
  const className = `alert ${type === "error" ? "alert-error" : "alert-success"}`;
  return (
    <div role="alert" className={className}>
      {children}
    </div>
  );
}

export default Alert;
