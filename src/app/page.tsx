'use client'
import styles from "./page.module.css";
import ProjectGallery from "@/app/components/ProjectGallery";
import { useState } from "react";

export default function Home() {
  const [hoverVideo, setHoverVideo] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {/* Static Background Video */}
      <div className={styles.videoBackground}>
        <video autoPlay muted loop className={styles.staticBackgroundVideo}>
          <source src="/tv-static.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hover Video */}
      {hoverVideo && (
        <div className={styles.videoBackground}>
          <video key={hoverVideo} autoPlay muted loop className={styles.hoverBackgroundVideo}>
            <source src={hoverVideo || ""} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <section className={styles.main} id="main">
        <div className={styles.logo}>BANGS</div>
        <div><center>We craft funny, awe-inspiring work for brands across all screens and experiences</center></div>
        <ProjectGallery setBackgroundVideo={setHoverVideo} />
      </section>

      <section className={styles.about} id="about">
        <h1>About Us</h1>
        <p>This is the about section.</p>
      </section>
    </div>
  );
}
