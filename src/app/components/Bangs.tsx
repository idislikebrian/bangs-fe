import React from "react";
import styles from "./Bangs.module.css";

const Bangs: React.FC = () => {
  const scrollToMain = () => {
    const mainElement = document.getElementById("main");
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.navChange} onClick={scrollToMain}>
      <img src="/bang.gif" width={48} height={48} alt="Scroll to main" />
    </div>
  );
};

export default Bangs;