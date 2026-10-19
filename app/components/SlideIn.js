"use client";

import { motion } from "motion/react";

// Odakle element "uleti"
const SMJEROVI = {
  lijevo: { x: -60 },
  desno: { x: 60 },
  dole: { y: 60 },
};

export default function SlideIn({ children, smjer = "dole", kasnjenje = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...SMJEROVI[smjer] }} // pocetak: nevidljivo i pomjereno
      whileInView={{ opacity: 1, x: 0, y: 0 }} // kad se pojavi na ekranu: na svoje mjesto
      viewport={{ once: true, amount: 0.3 }} // animiraj samo jednom, kad se vidi 30% elementa
      transition={{ duration: 0.7, delay: kasnjenje, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}