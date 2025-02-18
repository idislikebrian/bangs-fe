"use client";

import React, { useEffect } from "react";
import styles from "./Project.module.css";

interface ProjectProps {
  video: { id: string; name: string };
  onClose: () => void;
}

const Project: React.FC<ProjectProps> = ({ video, onClose }) => {
  // Close modal on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://player.vimeo.com/video/${video.id}?autoplay=1&muted=0&title=0&byline=0&portrait=0&controls=0&transparent=1`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          className={styles.vimeoPlayer}
        ></iframe>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default Project;
