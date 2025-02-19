'use client'
import React, { useEffect, useState } from "react";
import styles from "./ProjectGallery.module.css";

import Project from "./Project";

interface VideoFile {
  quality: string;
  codec: string;
  width: number;
  height: number;
  fps: number;
  size: number;
  link: string;
  expires: string;
}

interface Video {
  id: string;
  name: string;
  description: string;
  link: string;
  duration: number;
  created_time: string;
  thumbnail: string;
  files: VideoFile[];
}

interface ProjectGalleryProps {
  setBackgroundVideo: (videoUrl: string | null) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  setBackgroundVideo,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("/api/vimeo")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.videos);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  useEffect(() => {
    if (videos.length === 0) {
      console.log("No videos found.");
    }
  }, [videos]);

  useEffect(() => {
    if (videos.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos, isHovered]);

  useEffect(() => {
    if (videos.length > 0 && !isHovered) {
      const videoUrl = videos[currentIndex].files[0]?.link || null;
      console.log(videoUrl)
      setBackgroundVideo(videoUrl ? `${videoUrl}` : null);
    }
  }, [currentIndex, videos, isHovered, setBackgroundVideo]);

  const openModal = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className={styles.root}>
      {/* Sentence-style Video List */}
      <div className={styles.videoSentence}>
        {videos.map((video, index) => {
          const videoUrl = video.files[0]?.link || null;

          return (
            <span
              key={video.id}
              className={styles.videoTitle}
              onMouseEnter={() => {
                setBackgroundVideo(videoUrl ? `${videoUrl}#t=5s` : null);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              onClick={() => openModal(video)}
            >
              {video.name}
              {index !== videos.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>

      {/* Project Modal (Video Player) */}
      {selectedVideo && <Project video={selectedVideo} onClose={closeModal} />}
    </div>
  );
};

export default ProjectGallery;