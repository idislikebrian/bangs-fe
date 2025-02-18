import { NextResponse } from "next/server";

export async function GET() {
  const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

  if (!VIMEO_ACCESS_TOKEN) {
    console.error("❌ Vimeo access token is missing.");
    return NextResponse.json(
      { error: "Vimeo access token is missing" },
      { status: 500 }
    );
  }

  const SHOWCASE_ID = "5678517"; // Hardcoded showcase ID
  const SHOWCASE_URL = `https://api.vimeo.com/albums/${SHOWCASE_ID}`;
  const VIDEOS_URL = `https://api.vimeo.com/albums/${SHOWCASE_ID}/videos`;

  try {
    // console.log("🔍 Fetching showcase details...");
    const showcaseResponse = await fetch(SHOWCASE_URL, {
      headers: {
        Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!showcaseResponse.ok) {
      console.error("❌ Failed to fetch Vimeo showcase:", showcaseResponse.statusText);
      throw new Error(`Failed to fetch Vimeo showcase: ${showcaseResponse.statusText}`);
    }

    const showcaseData = await showcaseResponse.json();
    // console.log("✅ Showcase details fetched:", showcaseData.name);

    // console.log("🔍 Fetching videos inside the showcase...");
    const videosResponse = await fetch(VIDEOS_URL, {
      headers: {
        Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!videosResponse.ok) {
      console.error("❌ Failed to fetch Vimeo showcase videos:", videosResponse.statusText);
      throw new Error(`Failed to fetch Vimeo showcase videos: ${videosResponse.statusText}`);
    }

    const videosData = await videosResponse.json();
    // console.log(`✅ Found ${videosData.data.length} videos.`);

    // Process each video and retrieve detailed video file URLs
    const videos = await Promise.all(
      videosData.data.map(async (video: any) => {
        const videoId = video.uri.split("/").pop(); // Extract video ID

        // console.log(`🔍 Fetching details for video: ${video.name} (ID: ${videoId})`);
        const videoDetailsResponse = await fetch(
          `https://api.vimeo.com/videos/${videoId}?fields=play`,
          {
            headers: {
              Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!videoDetailsResponse.ok) {
          console.warn(`⚠️ Failed to fetch video details for ${videoId}:`, videoDetailsResponse.statusText);
          return null;
        }

        const videoDetails = await videoDetailsResponse.json();
        // console.log(`✅ Video details fetched for ${video.name}:`, videoDetails.play);

        // Check if progressive files exist
        const videoFiles = videoDetails.play?.progressive || [];
        if (videoFiles.length === 0) {
          // console.warn(`⚠️ No progressive video files found for ${video.name} (ID: ${videoId}).`);
          // console.log("➡️ Checking alternative playback formats...");

          if (videoDetails.play?.hls?.link) {
            // console.log(`🎥 HLS Streaming available: ${videoDetails.play.hls.link}`);
          }
          if (videoDetails.play?.dash?.link) {
            // console.log(`🎥 DASH Streaming available: ${videoDetails.play.dash.link}`);
          }
        } else {
          // console.log(`🎬 Video files found for ${video.name}:`, videoFiles.map(f => f.link));
        }

        return {
          id: videoId,
          name: video.name.split(/\s*[-–]\s*/)[0], // Extract text before the first dash
          description: video.description,
          link: video.link,
          duration: video.duration,
          created_time: video.created_time,
          thumbnail: video.pictures?.sizes?.pop()?.link, // Highest resolution thumbnail
          files: videoFiles, // List of actual video files
          hls: videoDetails.play?.hls?.link || null, // Add HLS fallback
          dash: videoDetails.play?.dash?.link || null, // Add DASH fallback
        };
      })
    );

    return NextResponse.json({
      showcase: {
        name: showcaseData.name,
        link: showcaseData.link,
        duration: showcaseData.duration,
        created_time: showcaseData.created_time,
        thumbnail: showcaseData.pictures?.sizes?.pop()?.link,
      },
      videos: videos.filter(Boolean), // Remove null values
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 }
    );
  }
}
