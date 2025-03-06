"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const About = ({ isVisible }: { isVisible: boolean }) => {
  const [albumVideo, setAlbumVideo] = useState<string | null>(null);
  const about = "4677550";

  useEffect(() => {
    fetch(`/api/vimeo?albumId=${about}`)
      .then((response) => response.json())
      .then((videos) => {
        if (videos && videos.length > 0) {
          setAlbumVideo(videos[0].files[0]?.link || null);
        }
      })
      .catch((error) => console.error("Error fetching album videos:", error));
  }, []);

  return (
    <motion.div
      id="about"
      className={styles.container}
      initial={{ y: "-100vh" }} // Start off-screen
      animate={{ y: isVisible ? 0 : "-100vh" }} 
      transition={{ type: "spring", stiffness: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" }}
    >
      <div className={styles.mobileMenu}></div>

      <section className={styles.about} id="about">
        <div className={styles.aboutContent}>
          <center>
            {albumVideo && (
              <div className={styles.videoContainer}>
                <video autoPlay muted loop className={styles.mainVideo}>
                  <source src={albumVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </center>
          <div className={styles.aboutText}>
            <p>
              BARRY IS A NYC-BASED DIRECTOR WHO COMBINES SHARP HUMOR WITH
              CINEMATIC FLAIR. HE ATTRIBUTES HIS MISCHIEVOUS CHILDHOOD TO THE
              NARRATIVES HE BRINGS TO LIFE TODAY. THIS CREATIVE JOURNEY HAS LED
              HIM FROM A CREATIVE AT MTV TO VIRAL RAPPER TO DIRECTING TOP-TIER
              COMMERCIAL WORK FOR GLOBAL BRANDS. BARRY&apos;S STYLE IS CHARACTERIZED
              BY GLORIFYING UNEXPECTED CHARACTERS AND SMALL MOMENTS, OFTEN
              WALKING THE LINE BETWEEN HUMOR AND POIGNANCY. WITH OVER A DECADE
              OF EXPERIENCE LEADING CREATIVE TEAMS, HIS WORK CONSISTENTLY
              DELIVERS EXCITEMENT, SMILES, AND ACCOLADES. WHEN NOT WRITING
              TREATMENTS OR CREATING LAUGHS ON SCREEN, HE&apos;S EXPLORING THE
              FRONTIERS OF VIRTUAL PRODUCTION AND THE METAVERSE, BRINGING HIS
              SIGNATURE WIT AND HUMANITY TO NEW FORMATS. @BARRYBANGS (IG)
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;