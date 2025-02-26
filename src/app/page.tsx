"use client";
import styles from "./page.module.css";
import ProjectGallery from "@/app/components/ProjectGallery";
import { useState } from "react";
import Contact from "./components/Contact";
import Bangs from "./components/Bangs";
import VideoBackground from "./components/VideoBackground";
import Loader from "@/app/components/Loader";

export default function Home() {
  const [hoverVideo, setHoverVideo] = useState<string | null>(null);

  return (
    <div className={styles.container}>

      <Loader duration={4000}/>

      <Contact />
      <Bangs />

      <section className={styles.main} id="main">
      <VideoBackground albumId="5678517" />

        <div className={styles.logo}>BANGS</div>
        <div className={styles.clients}>
          <ProjectGallery setBackgroundVideo={setHoverVideo} />
        </div>
        <div className={styles.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              stroke="currentColor"
              d="M25.333 12 16 21.333 6.666 12"
            ></path>
          </svg>
        </div>
      </section>

      <section className={styles.tag} id="tag">
        <div>
          <center>
            We craft funny, awe-inspiring work for brands across all screens and
            experiences
          </center>
        </div>
        <div className={styles.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              stroke="currentColor"
              d="M25.333 12 16 21.333 6.666 12"
            ></path>
          </svg>
        </div>
      </section>

      <section className={styles.about} id="about">
        <p>
          Every great project starts with one person sitting, thinking,
          planning.
        </p>
        <div className={styles.contact}>
          <a href="">email</a>.{" "}
          <a href="" target="_blank">
            instagram
          </a>
          .
        </div>
      </section>
    </div>
  );
}
