import { useState, useEffect } from "react";

export default function OfflineKit() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/product/sel")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div id="wrapper" className="min-h-screen bg-gray-50">
      <div id="content-wrapper" className="flex flex-col">
        <div id="content" className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Offline Kit</h1>

            {products.length === 0 ? (
              <p className="text-gray-600">Loading products...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between transition-transform transform hover:scale-[1.02]"
                  >
                    {/* Product Image */}
                    {product.pimg && (
                      <img
                        src={`http://localhost:2000/product_img/${product.pimg}`}
                        alt={product.pname}
                        className="h-48 object-cover rounded-md mb-4"
                      />
                    )}

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.pname}</h2>
                    <p className="text-gray-600 text-sm mb-4">{product.pdetails}</p>
                    <p className="text-indigo-600 font-bold text-lg mb-4">₹{product.pprice}</p>

                    {/* Action Buttons */}
                    <div className="mt-auto flex flex-col gap-3">
                      {product.ppdf && (
                        <a
                          href={`http://localhost:2000/product_pdf/${product.ppdf}`}
                          download
                          className="bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition"
                        >
                          📄 Download PDF
                        </a>
                      )}
                      <button className="bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition">
                        🛒 Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
