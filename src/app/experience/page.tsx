"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ExperiencePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentlyPlaying] = useState<{ isPlaying: boolean; title?: string; artist?: string; songUrl?: string } | null>(null);
  const [loading] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    };

    const drawBackground = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (darkMode) {
        ctx.fillStyle = 'rgb(26, 26, 26)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]); 

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen w-full flex transition-colors duration-300 ${darkMode ? 'bg-[rgb(26,26,26)] text-white' : 'bg-white text-black'}`}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-screen -z-10"
      />
      
      <div className="flex flex-row w-full min-h-screen flex-container">
        <Sidebar darkMode={darkMode} currentlyPlaying={currentlyPlaying} loading={loading} />

        <div className="flex-1 flex flex-col p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-8 max-w-[700px]">
            <Link href="https://jasonhoabui.vercel.app" className="text-2xl font-light text-blue-400 hover:underline">
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
            <div className="text-3xl font-bold pt-10 pb-5 text-blue-400">work</div>
            <div>
              <p className="text-xl">
                incoming data science intern at {" "}
                <a
                  href="https://datascience.uchicago.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  uchicago dsi 
                </a>
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>summer 2025</p>
              <br />

              <p className="text-xl">
                incoming eureka scholar at {" "}
                <a
                  href="https://eureka.csep.ucsb.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  ucsb csep
                </a>
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>summer 2025</p>
              <br />

              <p className="text-xl">
                accelerate fellow at{" "}
                <a
                  href="https://www.ibm.com/us-en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  ibm
                </a>
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>summer 2024 - cloud computing, ai</p>
              <br />
            </div>

            <div className="text-3xl font-bold pt-10 pb-5 text-blue-400">projects</div>
            <div className="flex items-center">
              <p className="text-xl w-1/2">cloudchat</p>
              <div className="flex items-center w-1/2 pl-4">
                <a
                  href="https://threads-clone-ebon-eight.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 hover:underline"
                >
                  live
                </a>
                <a
                  href="https://github.com/laura-codess/threads-clone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  github
                </a>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}></p>

            <div className="flex items-center pt-5">
              <p className="text-xl w-1/2">galaxy generator</p>
              <div className="flex items-center w-1/2 pl-4">
                <a
                  href="https://galaxy-generator-sooty-six.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 hover:underline text-10 sm:text-16"
                >
                  live
                </a>
                <a
                  href="https://github.com/laura-codess/galaxy-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  github
                </a>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}></p>

            <div className="text-3xl font-bold pt-10 pb-5 text-blue-400">leadership</div>
            <div className="flex items-center">
              <p className="text-xl w-1/2">math society @ nyu</p>
              <div className="flex items-center w-1/2 pl-4">
                <a
                  href="https://wp.nyu.edu/nyumathsociety/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  2023 - present
                </a>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>president</p>
            <br />

            <div className="flex items-center">
              <p className="text-xl w-1/2">hacknyu</p>
              <div className="flex items-center w-1/2 pl-4">
                <a
                  href="https://wp.nyu.edu/nyumathsociety/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  2024 - present
                </a>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>developer on tech team</p>
            <br />

            <div className="flex items-center">
              <p className="text-xl w-1/2">women in computing @ nyu</p>
              <div className="flex items-center w-1/2 pl-4">
                <a
                  href="https://nyuwinc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  2024 - present
                </a>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>marketing coordinator</p>

            <div className="text-3xl font-bold pt-10 pb-5 text-blue-400">hackathons</div>
            <div className="flex items-center">
              <p className="text-xl w-1/2">vimcat</p>
              <div className="flex items-center w-1/2 pl-4">
                <a
                  href="https://devpost.com/software/vimcat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  devpost
                </a>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>#1 @ hacknyu</p>
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
    </div>
  );
};

export default ExperiencePage;