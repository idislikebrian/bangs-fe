import React from "react";
import Link from 'next/link';
import styles from "./Contact.module.css";

interface ContactProps {
  onAboutClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onAboutClick }) => {
  const handleEmail = () => {
    const email = "B@barrybangs.com";
    const subject = encodeURIComponent("Sup Bangs");
    const body = encodeURIComponent("Can we collaborate on a commercial soon?");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div className={styles.contact}>
        <div onClick={handleEmail}>📧</div>
        <div onClick={onAboutClick}>👤</div>
      </div>
    </>
  );
};

export default Contact;