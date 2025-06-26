const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#0d1117] p-4 rounded-lg border border-gray-800 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.title} className="w-full rounded mb-3" />
      <h3 className="text-white font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-400 text-sm">{product.weight}</p>
      <p className="text-yellow-400 text-xl mt-1">{product.price.toFixed(3)} KD</p>
      <button className="bg-yellow-500 text-black mt-3 px-4 py-1 rounded hover:bg-yellow-400">Add to Cart</button>
    </div>
  );
};
export default ProductCard;
