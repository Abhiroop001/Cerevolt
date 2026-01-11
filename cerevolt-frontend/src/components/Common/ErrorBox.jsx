import React from "react";

export default function ErrorBox({ children }) {
  return <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded">{children}</div>;
}
