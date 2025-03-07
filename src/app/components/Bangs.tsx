import React from "react";
import styles from "./Bangs.module.css";
import Image from "next/image";

interface BangsProps {
  isAboutVisible: boolean;
  handleAboutClick: () => void;
}

const Bangs: React.FC<BangsProps> = ({ isAboutVisible, handleAboutClick }) => {
  const handleClick = () => {
    if (isAboutVisible) {
      handleAboutClick();
      scrollToMain();
    } else {
      scrollToMain();
    }
  };

  const scrollToMain = () => {
    const mainElement = document.getElementById("main");
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.navChange} onClick={handleClick}>
      <Image src="/bang.gif" width={48} height={48} alt="Scroll to main" />
    </div>
  );
};

export default Bangs;