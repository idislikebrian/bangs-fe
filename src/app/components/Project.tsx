"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Project.module.css";

interface ProjectProps {
  video: { id: string; name: string };
  onClose: () => void;
}

const Project: React.FC<ProjectProps> = ({ video, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== "https://player.vimeo.com") return;
      const data = event.data;
      if (data && data.event === "finish") {
        onClose();
      }
    };
    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${video.id}?autoplay=1&muted=0&title=0&byline=0&portrait=0&transparent=1&loop=0&api=1&player_id=vimeo-player`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          className={styles.vimeoPlayer}
        ></iframe>
      </div>
    </div>
  );
};

export default Project;
