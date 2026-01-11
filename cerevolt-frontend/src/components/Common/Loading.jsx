import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-cerevoltBlue border-t-transparent"></div>
      <span className="ml-3">Loading...</span>
    </div>
  );
}
