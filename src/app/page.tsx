'use client'
import styles from "./page.module.css";
import ProjectGallery from "@/app/components/ProjectGallery";
import { useState, useEffect } from "react";

export default function Home() {
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);

  useEffect(() => {
    // console.log("Background video updated:", backgroundVideo);
  }, [backgroundVideo]);

  return (
    <div className={styles.page}>
      {/* Background Video Container */}
      <div className={styles.videoBackground}>
        {backgroundVideo && (
          <video key={backgroundVideo} autoPlay muted loop className={styles.backgroundVideo}>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <main className={styles.main}>
        <div className={styles.logo}>BANGS.</div>
        <ProjectGallery setBackgroundVideo={setBackgroundVideo} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
