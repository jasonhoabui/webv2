import Image from "next/image";
import { MapPin, Building, Music, Layers } from "lucide-react";

interface SidebarProps {
  darkMode?: boolean;
  currentlyPlaying: { isPlaying: boolean; title?: string; artist?: string; songUrl?: string } | null;
  loading: boolean;
}

export default function Sidebar({ darkMode = true, currentlyPlaying, loading }: SidebarProps) {
  return (
    <div
      className={`w-full md:w-64 p-4 md:p-6 flex flex-col ${
        darkMode ? "bg-[rgb(26,26,26)] text-white" : "bg-white text-black"
      } h-auto md:h-screen transition-colors duration-300`}
    >
      <div className="mb-6">
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="rounded-md mb-4 mx-auto md:mx-0"
        />
      </div>

      <div className="flex items-center text-sm mb-2">
        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>garden grove, ca</span>
      </div>

      <div className="flex items-center text-sm mb-2">
        <Building className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>unemployed</span>
      </div>

      <div className="flex items-center text-sm mb-2">
        <Music className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>
          {loading ? (
            "listening to"
          ) : currentlyPlaying?.isPlaying ? (
            <span>
              Listening to{" "}
              <a href={currentlyPlaying.songUrl} className="text-blue-400 underline">
                {currentlyPlaying.title}
              </a>{" "}
              by {currentlyPlaying.artist}
            </span>
          ) : (
            "listening to"
          )}
        </span>
      </div>

      <div className="flex items-center text-sm">
        <Layers className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>python, typescript, postgres</span>
      </div>
    </div>
  );
}