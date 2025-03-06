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

const portfolio = "5678517"; // Default album ID (currently not in use)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get("albumId") || portfolio; // Use query param or default

/*     const albumsEndpoint = `https://api.vimeo.com/users/1887246/albums`;
    const albumsResponse = await fetch(albumsEndpoint, {
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      },
    });

    if (!albumsResponse.ok) {
      console.error("Failed to fetch albums");
    } else {
      const albumsData: VimeoAPIResponse = await albumsResponse.json();
      const albumDetails = albumsData.data.map(album => ({
        id: album.uri.split('/').pop() || 'Unknown ID',
        name: album.name
      }));
      console.log("Album Details:", albumDetails);
    } */

    const endpoint = albumId
      ? `https://api.vimeo.com/users/1887246/albums/${albumId}/videos?sort=default`
      : `https://api.vimeo.com/users/1887246/albums`; // Fetch all collections if no albumId

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
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
      name: video.name.split('/')[0], 
      link: video.link,
      duration: video.duration,
      created_time: video.created_time,
      pictures: video.pictures,
      files: video.files || [],
    }));

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
