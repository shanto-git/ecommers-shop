"use client";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const verticalLines = [10, 30, 50, 70, 90]; 
  const horizontalLines = [20, 45, 65, 85];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000b18]">
      
      {verticalLines.map((leftPos, index) => (
        <motion.div
          key={`v-${index}`}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ 
            y: ["0vh", "100vh"], 
            opacity: [0, 0.5, 0] 
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.5,
          }}
          style={{ left: `${leftPos}%` }}
          className="absolute w-[3px] h-32 bg-gradient-to-b from-transparent via-white to-transparent"
        />
      ))}

      {horizontalLines.map((topPos, index) => (
        <motion.div
          key={`h-${index}`}
          initial={{ x: "110vw", opacity: 0 }}
          animate={{ 
            x: ["0vw", "-110vw"], 
            opacity: [0, 0.4, 0] 
          }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "linear",
            delay: index * 1.2,
          }}
          style={{ top: `${topPos}%` }}
          className="absolute h-[3px] w-32 from-transparent via-white to-transparent"
        />
      ))}

      
    </div>
  );
};

export default AnimatedBackground;