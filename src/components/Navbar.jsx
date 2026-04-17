"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { auth } from "@/lib/firebase.config"; 
import { onAuthStateChanged } from "firebase/auth"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const { cartItems } = useCart() || { cartItems: [] };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 text-white">
      <div className="flex justify-between items-center py-4 max-w-7xl mx-auto">
 
        <div className="w-40">
          <Link href="/">
            <img src="/কাঠঠোকরা লোগো-02 (2).png" alt="Logo" className="cursor-pointer" />
          </Link>
        </div>

        <div className="hidden md:block backdrop-blur-sm shadow-md px-5 py-3 rounded-full border border-gray-500">
          <ul className="flex gap-8 font-medium">
            <li><Link href="/" className="hover:text-amber-500 transition">Home</Link></li>
            <li><Link href="/men" className="hover:text-amber-500 transition">Men</Link></li>
            <li><Link href="/women" className="hover:text-amber-500 transition">Women</Link></li>
            <li><Link href="/kids" className="hover:text-amber-500 transition">Kids</Link></li>
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative">
            <AiOutlineShoppingCart size={28} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth/Profile Section */}
          <div className="flex items-center gap-4">
            {user ? (
              /* প্রোফাইল ছবি এবং লিংক */
              <Link href="/profile">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <img 
                    src={user.photoURL || "/default-avatar.png"} 
                    className="w-10 h-10 rounded-full border-2 border-amber-500 group-hover:border-white transition-all" 
                    alt="Profile" 
                  />
                </div>
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-semibold hover:text-amber-500 flex items-center gap-1">
                <AiOutlineUser size={20} /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } bg-[#001e3c] border-b border-gray-800`}
      >
        <ul className="flex flex-col gap-4 px-6 py-5 font-medium">
          <li><Link href="/" onClick={() => setOpen(false)} className="hover:text-amber-500">Home</Link></li>
          <li><Link href="/men" onClick={() => setOpen(false)} className="hover:text-amber-500">Men</Link></li>
          <li><Link href="/women" onClick={() => setOpen(false)} className="hover:text-amber-500">Women</Link></li>
          <li><Link href="/kids" onClick={() => setOpen(false)} className="hover:text-amber-500">Kids</Link></li>
          {user && (
            <li><Link href="/profile" onClick={() => setOpen(false)} className="text-amber-500">My Profile</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;