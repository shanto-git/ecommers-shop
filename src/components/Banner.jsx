"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ব্যানার ডাটা (ইমেজ পাথ এবং টাইটেল)
const bannerData = [
  {
    id: 1,
    image: "/EID_WEV_COVER_05.03.24_ME_2e468edf-2c7d-4d58-8b34-b5928fa31834.jpeg", // public folder root
    title: "Elevate Your Style",
    subtitle: "Explore Men's Premium Collection",
    link: "/men",
    btnText: "Shop Men",
  },
  {
    id: 2,
    image: "/women.jpeg",
    title: "Define Your Elegance",
    subtitle: "Discover Women's Latest Trends",
    link: "/women",
    btnText: "Shop Women",
  },
  {
    id: 3,
    image: "/kids.jpeg",
    title: "Playful Comforts",
    subtitle: "Cute & Comfy Outfits for Kids",
    link: "/kids",
    btnText: "Shop Kids",
  },
];

const variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1, transition: { duration: 1 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 1 } },
};

const textVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 0.8, duration: 0.8 } },
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5000ms = 5s

    return () => clearInterval(timer);
  }, []);

  const currentBanner = bannerData[currentIndex];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center"
          />
                    <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id}
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
              {currentBanner.title}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl drop-shadow-md">
              {currentBanner.subtitle}
            </p>
            <Link href={currentBanner.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-10 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-200 transition duration-300"
              >
                {currentBanner.btnText}
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {bannerData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;