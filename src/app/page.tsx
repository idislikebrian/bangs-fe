"use client";
import styles from "./page.module.css";
import { motion, AnimatePresence } from "framer-motion";
import ProjectGallery from "@/app/components/ProjectGallery";
import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import Bangs from "./components/Bangs";
import VideoBackground from "./components/VideoBackground";
import Loader from "@/app/components/Loader";
import About from "./components/About";
import Image from "next/image";

export default function Home() {
  const [hoverVideo, setHoverVideo] = useState<string | null>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const [showVideo, setShowVideo] = useState(true);
  const [isVisible, setIsVisible] = useState(false); // Controls display: none

  const handleAboutClick = () => {
    setIsAboutVisible((prev) => !prev);
  };

  const handleEmail = () => {
    const email = "B@barrybangs.com";
    const subject = encodeURIComponent("Sup Bangs");
    const body = encodeURIComponent("Can we collaborate on a commercial soon?");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (hoverVideo) {
      setIsVisible(true);
      setShowVideo(true);
  
      const fadeOutTimer = setTimeout(() => {
        setShowVideo(false);
      }, 2000);
  
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
  
      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [hoverVideo]);

  return (
    <div className={styles.container}>
      <Loader duration={3000} />

      <Contact onAboutClick={handleAboutClick} />
      <Bangs isAboutVisible={isAboutVisible} handleAboutClick={handleAboutClick} />
      <div className={styles.mobileMenu}></div>

        {hoverVideo && (
          <AnimatePresence>
            <div 
              className={styles.FullscreenVideo}
              style={{ display: isVisible ? "block" : "none" }} // Hides parent div when animation is done
              >
                <motion.video
                  key={hoverVideo}
                  autoPlay
                  loop
                  className={styles.videoElement}

                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <source src={hoverVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
            </div>
          </AnimatePresence>
        )}

      <section className={styles.main} id="main">
        <VideoBackground albumId="4677546" />

        <div className={styles.logo}>BANGS</div>
        <div className={styles.clients}>
          <ProjectGallery setBackgroundVideo={setHoverVideo} />
        </div>
        <div className={styles.arrowHome}>
            <center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                viewBox="0 0 32 32"
              >
                <path stroke="yellow" d="M25.333 12 16 21.333 6.666 12"></path>
              </svg>
            </center>
          </div>
      </section>

      <section className={styles.tag} id="tag">
        <div className={styles.tagJuice}>
            LEADING TEAMS TO CREATE DAZZLING COMMERCIAL WORK ACROSS ALL SCREENS
            AND EXPERIENCES.
          <div className={styles.arrow}>
            <center>
              <h3>Have a project?</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                viewBox="0 0 32 32"
              >
                <path stroke="yellow" d="M25.333 12 16 21.333 6.666 12"></path>
              </svg>
            </center>
          </div>
        </div>
      </section>

      <section className={styles.third} id="third">
        <div className={styles.thirdJuice} onClick={handleEmail}>
              <span className={styles.link}>CLICK<Image src="/bang.gif" width={48} height={48} alt="Contact Barry via Email" />HERE</span>
            <br />
            LETS START PUTTING
            <br />
            IDEAS ON PAPER.
        </div>
      </section>

      <About isVisible={isAboutVisible} /> {/* Pass the visibility state */}
    </div>
  );
}