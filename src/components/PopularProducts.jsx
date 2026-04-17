"use client";

import { motion } from "framer-motion";
import productsData from "@/data/product.json";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const popularProducts = productsData.slice(0, 8);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-white"
        >
          Our Popular Products
        </motion.h2>
        <div className="w-100 h-1 bg-white mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {popularProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* এখানে প্রতিটি প্রোডাক্টের জন্য আলাদা কার্ড কল হচ্ছে */}
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;