"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Swal from "sweetalert2";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // ফাংশনের নাম handleAddToCart করে দেওয়া হলো
  const handleAddToCart = (e) => {
    e.preventDefault(); // যাতে লিঙ্কে ক্লিক হয়ে ডিটেইলস পেজে না যায়
    addToCart(product); 
    
    Swal.fire({
      title: "Added!",
      text: `${product.name} added to cart`,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64">
          <img
            src={product.photoURL}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
            ${product.price}
          </div>
        </div>

        <div className="p-4">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
            {product.category}
          </span>

          <h3 className="text-lg font-semibold mt-1 truncate text-white">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-1">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">
              Stock: {product.quantity}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-400 transition"
            >
              <AiOutlineShoppingCart size={20} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;