"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/PrivateRoute";

export default function CartPage() {
  // ১. স্টেটের নাম সব জায়গায় এক রাখা হয়েছে (cartItems)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // লোকাল স্টোরেজে ডাটা সেভ করার জন্য একটি হেল্পার ফাংশন
  const saveToLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems(items);
  };

  const updateQuantity = (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    saveToLocalStorage(updatedCart); // স্টেট এবং মেমোরি দুইটাই আপডেট হবে
  };

  const removeItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredCart = cartItems.filter((item) => item.id !== id);
        saveToLocalStorage(filteredCart); // ডিলিট করার পর মেমোরি আপডেট
      }
    });
  };

  // টোটাল প্রাইস ক্যালকুলেশন
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <PrivateRoute>
      <div className="min-h-screen py-10 px-4 md:px-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-800 bg-[#001e3c]"
                  >
                    <div className="flex items-center gap-4">
                      <img src={item.photoURL} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-400">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, "dec")} className="p-2 hover:text-red-500 transition"><AiOutlineMinus /></button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, "inc")} className="p-2 hover:text-green-500 transition"><AiOutlinePlus /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 text-xl transition">
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="p-6 rounded-xl shadow-sm border border-gray-800 bg-[#001e3c] h-fit">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t border-gray-700 pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-white text-black py-4 rounded-full mt-8 font-bold hover:bg-gray-200 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-6">Your cart is empty!</p>
            <Link href="/" className="bg-white text-black px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-gray-200 transition">
              <AiOutlineArrowLeft /> Back to Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
    </PrivateRoute>
  );
}