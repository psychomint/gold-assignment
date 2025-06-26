import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { dummyProducts } from "./dummyProducts";
import { useOutletContext } from "react-router-dom"; // 👈

const Shop = () => {
  const [filters, setFilters] = useState({ categories: [], weight: "" });
  const [products, setProducts] = useState([]);
  const { addToCart } = useOutletContext();

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const filtered = products.filter((p) => {
    const matchCategory =
      filters.categories.length === 0 || filters.categories.includes(p.category);
    const matchWeight = filters.weight === "" || filters.weight === p.weight;
    return matchCategory && matchWeight;
  });

  return (
    <div className="flex bg-[#0d1117] text-white min-h-screen">
      <Sidebar filters={filters} setFilters={setFilters} />

      <div className="flex-1 p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="bg-[#161b22] rounded-lg p-4 shadow-md">
            <div className="w-full h-40 overflow-hidden rounded mb-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
            <p className="text-yellow-400 font-bold text-xl mb-2">{p.price} KD</p>
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
