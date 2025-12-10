// src/components/LoadingDots.jsx
import React from "react";
import { motion } from "framer-motion";

export default function LoadingDots({ size = 8 }) {
  const bounce = {
    animate: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 0.6 } }
  };

  return (
    <div className="flex items-end gap-1">
      <motion.span
        style={{ width: size, height: size }}
        {...bounce}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="block rounded-full bg-slate-600"
      />
      <motion.span
        style={{ width: size, height: size }}
        {...bounce}
        transition={{ delay: 0.12, repeat: Infinity, duration: 0.6 }}
        className="block rounded-full bg-slate-600"
      />
      <motion.span
        style={{ width: size, height: size }}
        {...bounce}
        transition={{ delay: 0.24, repeat: Infinity, duration: 0.6 }}
        className="block rounded-full bg-slate-600"
      />
    </div>
  );
}
