'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Sidebar from './components/Sidebar';

interface CurrentlyPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const { data: session } = useSession();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/spotify/now-playing');
        const data: CurrentlyPlaying = await response.json();
        setCurrentlyPlaying(data);
      } catch (error) {
        console.error('Error fetching currently playing track:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentlyPlaying();

    const interval = setInterval(fetchCurrentlyPlaying, 30000);
    return () => clearInterval(interval);
  }, [session]);

  return (
    <div className={`h-screen flex flex-col md:flex-row transition-colors duration-300 ${darkMode ? 'bg-[rgb(26,26,26)] text-white' : 'bg-white text-black'}`}>
      <Sidebar darkMode={darkMode} currentlyPlaying={currentlyPlaying} loading={loading} />

      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 max-w-[700px]">
          <Link href="https://jasonhoabui.vercel.app" className="text-2xl font-light text-blue-400 hover:underline mb-4 md:mb-0">
            jasonhoabui
          </Link>
          <div className="flex justify-center items-center gap-4">
            <Link href="/resume.pdf" target="_blank" className={`text-gray-400 hover:text-blue-400 transition-colors underline decoration-blue-400 ${darkMode ? 'text-white' : 'text-black'}`}>
              resume
            </Link>
            <Link href="/experience" className={`text-gray-400 hover:text-blue-400 transition-colors underline decoration-blue-400 ${darkMode ? 'text-white' : 'text-black'}`}>
              experience
            </Link>
            <button className="ml-2 p-1 rounded-md" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5 text-blue-300" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl mb-6 mt-8">
            hey, i&apos;m <span className="text-blue-400 font-semibold">jason bui</span>!
          </h1>

          <p className="mb-4 text-xl break-words max-w-[700px]">
            i&apos;m currently a junior at{' '}
            <a href="https://www.ucsb.edu/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-blue-400 hover:text-blue-300">
              ucsb
            </a>
            , majoring in{' '}
            <a href="https://www.pstat.ucsb.edu/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-blue-400 hover:text-blue-300">
              statistics
            </a>
            .
          </p>

          <p className="mb-4 text-xl break-words max-w-[700px]">
            i&apos;m super interested in <span className="text-blue-400">machine learning</span>,{' '}
            <span className="text-blue-400">applied probability</span>, and{' '}
            <span className="text-blue-400">game theory</span>.
          </p>

          <p className="mb-4 text-xl break-words max-w-[700px]">
            most recently, i&apos;ve been diving into <span className="text-blue-400">poker theory</span>. i love to read about poker strategy and{' '}
            <a href="https://blogs.cornell.edu/info2040/2021/11/03/game-theory-optimal-gto-texas-holdem-poker-theory/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-blue-400 hover:text-blue-300">
              gto
            </a>
            . my favorite hand is qq.
          </p>

          <p className="mb-4 text-xl break-words max-w-[700px]">
            outside of work, you can catch me{' '}
            <a href="https://www.instagram.com/freedatboyjayson/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-blue-400 hover:text-blue-300">
              powerlifting
            </a>
            . at <span className="text-blue-400">160</span> lbs bw, i bench <span className="text-blue-400">230</span> lbs, squat{' '}
            <span className="text-blue-400">315</span> lbs, and deadlift <span className="text-blue-400">365</span> lbs.
          </p>

          <p className="mb-4 text-xl break-words max-w-[700px]">
            i love to eat fast food, especially <span className="text-blue-400">wingstop</span>. my go-to order is an{' '}
            <span className="text-blue-400">all-in bundle</span> (6 hot honey tenders, 16 boneless sweet chili glaze, lemon pepper large fries).
          </p>
        </div>

        <div className="flex gap-3 mt-4 ml-93 pr-6">
          <a href="https://github.com/jasonhoabui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors underline decoration-blue-400">
            github
          </a>
          <a href="https://www.linkedin.com/in/jasonhbui/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors underline decoration-blue-400">
            linkedin
          </a>
          <a href="mailto:jasonhoabui@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors underline decoration-blue-400">
            email
          </a>
        </div>
      </div>
    </div>
  );
}