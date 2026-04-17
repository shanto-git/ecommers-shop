import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My E-commerce Shop",
  description: "Next.js Static Shopping Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#000b18] text-white`}>
        <SmoothScroll>
          <AnimatedBackground/>
          <CartProvider>
            <Navbar />
            
            <main className="min-h-screen">
              {children} 
            </main>

            <footer className="py-10 text-center bg-[#001e3c] mt-10 border-t border-gray-800">
              <p className="text-gray-400">© 2026 My Shop Project | Built with Next.js</p>
            </footer>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}