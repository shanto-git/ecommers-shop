"use client";
import productsData from "@/data/product.json";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function MenPage() {
  const manProducts = productsData.filter(
    (item) => item.category == "men"
  );

  return (
    <div className="min-h-screen py-12 px-4 md:px-10 mt-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-center">Men's Collection</h1>
          <div className="border-b w-80 mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-2">Showing {manProducts.length} premium products</p>
        </motion.div>

        {manProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {manProducts.map((product, index) => (
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
        ) : (
          <div className="text-center py-20 text-gray-500">No products found in this category.</div>
        )}
      </div>
    </div>
  );
}