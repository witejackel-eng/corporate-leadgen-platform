"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "char";
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className,
  as: Tag = "h2",
  splitBy = "word",
  delay = 0,
  stagger = 0.04,
}: SplitTextProps) {
  const parts = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <Tag className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {part}
              {splitBy === "word" && i !== parts.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
