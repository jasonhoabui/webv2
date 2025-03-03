import { getTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

interface SpotifyTrack {
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
}

export async function GET() {
  const response = await getTopTracks();
  
  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ tracks: [] });
  }

  const data = await response.json();
  
  const tracks = data.items.map((track: SpotifyTrack) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    album: track.album.name,
    albumImageUrl: track.album.images[0].url,
    songUrl: track.external_urls.spotify
  }));

  return NextResponse.json({ tracks });
}