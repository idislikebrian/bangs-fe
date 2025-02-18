import { NextResponse } from "next/server";

interface VimeoVideo {
  uri: string;
  name: string;
  link: string;
  duration: number;
  created_time: string;
  pictures: { base_link: string };
  files?: { link: string; quality: string }[];
}

interface VimeoAPIResponse {
  data: VimeoVideo[];
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

    const data: VimeoAPIResponse = await response.json();

    if (!data || !data.data) {
      return NextResponse.json({ error: "Invalid response from Vimeo" }, { status: 500 });
    }

    const videos = data.data.map((video): {
      id: string;
      name: string;
      link: string;
      duration: number;
      created_time: string;
      pictures: { base_link: string };
      files: { link: string; quality: string }[];
    } => ({
      id: video.uri.split("/").pop() || "", 
      name: video.name.split(/\s*[-–]\s*/)[0], 
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