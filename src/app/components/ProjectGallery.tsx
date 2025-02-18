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

  useEffect(() => {
    fetch("/api/vimeo")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched videos:", data.videos);
        setVideos(data.videos);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  // Log if no videos are found
  useEffect(() => {
    if (videos.length === 0) {
      console.log("No videos found.");
    }
  }, [videos]);

  // Open modal + update URL
  const openModal = (video: Video) => {
    setSelectedVideo(video);
  };

  // Close modal + reset URL
  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className={styles.root}>
      {/* Sentence-style Video List */}
      <div className={styles.videoSentence}>
        {videos.map((video, index) => {
          const videoUrl = video.files[0]?.link || null;
          // console.log(`Processing video: ${video.name}, URL: ${videoUrl}`);

          return (
            <span
              key={video.id}
              className={styles.videoTitle}
              onMouseEnter={() => {
                // console.log(`Hovering over: ${video.name}, Setting video: ${videoUrl}`);
                setBackgroundVideo(videoUrl);
              }}
              onMouseLeave={() => {
                // console.log(`Mouse left: ${video.name}, Removing background video.`);
                setBackgroundVideo(null);
              }}
              onClick={() => openModal(video)}
            >
              {video.name}
              {index !== videos.length - 1 ? ", " : "."}
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
