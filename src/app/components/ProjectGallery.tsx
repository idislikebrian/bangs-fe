"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
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
  duration: number;
}

interface ProjectGalleryProps {
  setBackgroundVideo: (videoUrl: string | null, duration?: number) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ setBackgroundVideo }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const lastBgRef = useRef<string | null>(null);

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

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePointerEnter = useCallback((videoUrl: string | null, duration?: number) => {
    // Only handle hover effects on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      clearTimeout(hoverTimeout.current!);
      hoverTimeout.current = setTimeout(() => {
        if (lastBgRef.current !== videoUrl) {
          setBackgroundVideo(videoUrl, duration);
          lastBgRef.current = videoUrl;
        }
      }, 120);
    }
  }, [setBackgroundVideo]);

  const handlePointerLeave = useCallback(() => {
    // Only handle hover effects on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      clearTimeout(hoverTimeout.current!);
      if (lastBgRef.current !== null) {
        setBackgroundVideo(null);
        lastBgRef.current = null;
      }
    }
  }, [setBackgroundVideo]);

  const openModal = useCallback((video: Video) => {
    setSelectedVideo(video);
    // Clear background video when opening modal
    setBackgroundVideo(null);
    lastBgRef.current = null;
  }, [setBackgroundVideo]);

  const closeModal = useCallback(() => {
    setSelectedVideo(null);
    handlePointerLeave();
  }, [handlePointerLeave]);

  return (
    <div className={styles.root}>
      <div className={styles.videoSentence}>
        {videos.map((video, index) => {
          const videoUrl = video.files[0]?.link || null;
          const duration = video.duration;

          return (
            <motion.span
              key={video.id}
              className={styles.videoTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onPointerEnter={() => handlePointerEnter(videoUrl, duration)}
              onPointerLeave={handlePointerLeave}
              onClick={() => openModal(video)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openModal(video);
                }
              }}
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
