"use client";
import productsData from "@/data/product.json";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function WomenPage() {
  const womenProducts = productsData.filter(
    (item) => item.category === "women"
  );

  return (
    <div className="min-h-screen py-12 px-4 md:px-10 mt-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-center">Women's Collection</h1>
          <p className="text-gray-500 mt-2 text-center">Discover the latest trends for her</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {womenProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}