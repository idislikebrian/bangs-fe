import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.css";

interface LoaderProps {
  duration: number;
}

const Loader: React.FC<LoaderProps> = ({ duration }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const [timeLeft, setTimeLeft] = useState(duration); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 100) {
          clearInterval(interval);
          setIsVisible(false);
          return 0;
        }
        return prevTime - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    return `${String(seconds).padStart(2, '0')}:${String(ms).padStart(3, '0')}`;
  };

  return (
    <motion.div
      className={styles.loader}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.timer}>
        {/* {formatTime(timeLeft)} */}
      </div>
    </motion.div>
  );
};

export default Loader;