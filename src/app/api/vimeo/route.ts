import { NextResponse } from "next/server";

interface VimeoVideo {
  id: string;
  name: string;
  link: string;
  duration: number;
  created_time: string;
  pictures: { base_link: string };
  files?: { link: string; quality: string }[];
}

export async function GET() {
  try {
    const response = await fetch(`https://api.vimeo.com/users/1887246/albums/5678517/videos`, {
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch videos" }, { status: response.status });
    }

    const data = await response.json();
    
    if (!data || !data.data) {
      return NextResponse.json({ error: "Invalid response from Vimeo" }, { status: 500 });
    }

    // Ensure all video objects match the VimeoVideo interface
    const videos: VimeoVideo[] = data.data.map((video: any) => ({
      id: video.uri.split("/").pop(),
      name: video.name.split(/\s*[-–]\s*/)[0], // Extract text before the first dash
      link: video.link,
      duration: video.duration,
      created_time: video.created_time,
      pictures: video.pictures,
      files: video.files || [],
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching Vimeo videos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


          