"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./ProjectGallery.module.css";
import Project from "./Project";

interface VideoFile {
  link: string;
}

interface Video {
  id: string;
  name: string;
  files: VideoFile[];
}

interface ProjectGalleryProps {
  setBackgroundVideo: (videoUrl: string | null) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ setBackgroundVideo }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  useEffect(() => {  
    fetch("/api/vimeo")
      .then((response) => response.json())
      .then((data) => {
  
        if (!Array.isArray(data)) {
          console.error("Error: Expected an array but got:", data);
          return;
        }
  
        setVideos(data);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const handleMouseEnter = (videoUrl: string | null) => {
    setBackgroundVideo(videoUrl);
  };

  const handleMouseLeave = () => {
    setBackgroundVideo(null);
  };

  const openModal = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setBackgroundVideo(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.videoSentence}>
        {videos.map((video, index) => {
          const videoUrl = video.files[0]?.link || null;

          return (
            <motion.span
              key={video.id}
              className={styles.videoTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onMouseEnter={() => handleMouseEnter(videoUrl)}
              onMouseLeave={handleMouseLeave}
              onClick={() => openModal(video)}
            >
              {video.name}
            </motion.span>
          );
        })}
      </div>

      {selectedVideo && <Project video={selectedVideo} onClose={closeModal} />}
    </div>
  );
};

export default ProjectGallery;
