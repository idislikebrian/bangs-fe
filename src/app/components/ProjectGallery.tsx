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
  
  {/* const [isHovered, setIsHovered] = useState(false);
  const hoverDelay = 500;
  const hoverQueue = useRef<NodeJS.Timeout[]>([]); */}

  useEffect(() => {
    console.log("Fetching videos from /api/vimeo...");
  
    fetch("/api/vimeo")
      .then((response) => response.json())
      .then((data) => {
        // console.log("API response:", data);
  
        if (!Array.isArray(data)) {
          console.error("Error: Expected an array but got:", data);
          return;
        }
  
        console.log("Videos fetched successfully:", data);
        setVideos(data); // Directly set the array since there's no 'videos' key
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const handleMouseEnter = (videoUrl: string | null) => {
    // console.log("Mouse entered video title. Video URL:", videoUrl);
    setBackgroundVideo(videoUrl);
  };

  const handleMouseLeave = () => {
    // console.log("Mouse left video title.");
    setBackgroundVideo(null);
  };

  const openModal = (video: Video) => {
    // console.log("Opening modal for video:", video);
    setSelectedVideo(video);
  };

  const closeModal = () => {
    // console.log("Closing modal.");
    setSelectedVideo(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.videoSentence}>
        {videos.map((video, index) => {
          const videoUrl = video.files[0]?.link || null;
          console.log(`Rendering video: ${video.name}, URL: ${videoUrl}`);

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
              {index !== videos.length - 1 ? " " : ""}
            </motion.span>
          );
        })}
      </div>

      {selectedVideo && <Project video={selectedVideo} onClose={closeModal} />}
    </div>
  );
};

export default ProjectGallery;
