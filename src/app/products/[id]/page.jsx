"use client";
import { useState } from "react";
import products from "@/data/product.json";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";
import Link from "next/link";
import { useParams } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
export default function ProductDetails({ params }) {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const product = products.find((item) => item.id.toString() === id);

  if (!product) {
    return <div className="text-center py-20">Product not found!</div>;
  }

  const handleAddToCart = () => {
    Swal.fire({
      title: "Added to Cart!",
      text: `${count} x ${product.name} has been added.`,
      icon: "success",
      confirmButtonColor: "#000",
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 mt-10 md:px-10">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white mb-8 hover:text-gray-400 transition">
          <AiOutlineArrowLeft />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
            key={product.id}
              src={product.photoURL}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold uppercase">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-300">${product.price}</p>
            
            <div className="border-t border-b py-4">
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  className="px-4 py-2 hover:bg-gray-100 text-xl"
                >-</button>
                <span className="px-6 font-bold">{count}</span>
                <button 
                  onClick={() => setCount(count + 1)}
                  className="px-4 py-2 hover:bg-gray-100 text-xl"
                >+</button>
              </div>
              
              <p className="text-sm text-gray-400">In Stock: {product.quantity}</p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition shadow-lg"
            >
              <AiOutlineShoppingCart size={24} /> Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}