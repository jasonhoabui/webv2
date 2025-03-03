import { getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

interface SpotifyTrack {
  track: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
  played_at: string;
}

export async function GET() {
  const response = await getRecentlyPlayed();
  
  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ tracks: [] });
  }

  const data = await response.json();
  
  const tracks = data.items.map((item: SpotifyTrack) => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists.map(artist => artist.name).join(', '),
    album: item.track.album.name,
    albumImageUrl: item.track.album.images[0].url,
    songUrl: item.track.external_urls.spotify,
    playedAt: item.played_at
  }));

  return NextResponse.json({ tracks });
}