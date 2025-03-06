'use client'
import React, { useEffect, useState, useRef } from "react";
import styles from "./VideoBackground.module.css";

interface VideoFile {
  link: string;
}

interface VideoBackgroundProps {
  albumId: string;
  displayDuration?: number; // Duration in milliseconds
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  albumId,
  displayDuration = 5000 // Default to 5 seconds 
}) => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isVideoAActive, setIsVideoAActive] = useState(true);
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    fetch(`/api/vimeo?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formattedVideos = data.map((video: any) => {
            const bestFile =
              video.files?.find((file: any) => file.quality === "1080p") ||
              video.files?.find((file: any) => file.quality === "720p") ||
              video.files?.[0];

            return { link: bestFile?.link };
          }).filter(video => video.link);

          if (formattedVideos.length > 0) {
            setVideos(formattedVideos);
            setNextIndex(formattedVideos.length > 1 ? 1 : 0);
          }
        }
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, [albumId]);

  useEffect(() => {
    if (videos.length === 0) return;
    
    if (videoARef.current) {
      videoARef.current.src = videos[currentIndex].link;
      videoARef.current.load();
      videoARef.current.play().catch(err => console.error("Error playing video A:", err));
    }
    
    if (videoBRef.current && videos.length > 1) {
      videoBRef.current.src = videos[nextIndex].link;
      videoBRef.current.load();
    }
  }, [videos]);

  useEffect(() => {
    if (videos.length <= 1) return;
    
    const interval = setInterval(() => {
      const newNextIndex = (nextIndex + 1) % videos.length;
      
      const inactiveVideoRef = isVideoAActive ? videoBRef : videoARef;
      if (inactiveVideoRef.current) {
        inactiveVideoRef.current.src = videos[nextIndex].link;
        inactiveVideoRef.current.load();
        
        inactiveVideoRef.current.play()
          .then(() => {
            setIsVideoAActive(!isVideoAActive);
            setCurrentIndex(nextIndex);
            setNextIndex(newNextIndex);
          })
          .catch(err => console.error("Error playing next video:", err));
      }
    }, displayDuration);
    
    return () => clearInterval(interval);
  }, [videos, isVideoAActive, currentIndex, nextIndex, displayDuration]);

  if (videos.length === 0) {
    return <div className={styles.videoContainer} />;
  }

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoARef}
        className={`${styles.videoElement} ${isVideoAActive ? styles.active : styles.inactive}`}
        muted
        playsInline
      />
      <video
        ref={videoBRef}
        className={`${styles.videoElement} ${!isVideoAActive ? styles.active : styles.inactive}`}
        muted
        playsInline
      />
    </div>
  );
};

export default VideoBackground;