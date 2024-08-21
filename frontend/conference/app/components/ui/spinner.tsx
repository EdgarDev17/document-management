import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "#27272a",
  className,
}) => {
  return (
    <motion.div
      className={cn(className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: `${color} transparent transparent transparent`,
        borderWidth: "4px",
        borderStyle: "solid",
        borderRadius: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export default Spinner;
