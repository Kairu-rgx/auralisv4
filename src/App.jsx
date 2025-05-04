import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import MusicCard from './components/MusicCard';
import NowPlayingCard from './components/NowPlayingCard';
import SettingsModal from './components/SettingsModal';
import LibraryModal from './components/LibraryModal';
import SearchIcon from './assets/Icons/searchw.svg';
import './index.css';

import LRPD from './assets/Images/LRPD.jpg';
import Always from './assets/Images/Always.jpg';
import Scientist from './assets/Images/Scientist.jpg';
import SIY from './assets/Images/SIY.jpg';
import Silakbo from './assets/Images/Silakbo.jpg';

const yourSongs = [
  {
    id: 1,
    title: "Like Real People Do",
    artist: "Hozier",
    duration: "3:45",
    album: "Hozier",
    coverArt: LRPD,
    audioFile: null
  },
  {
    id: 2,
    title: "Always",
    artist: "Daniel Caesar",
    duration: "4:02",
    album: "Freudian",
    coverArt: Always,
    audioFile: null
  },
  {
    id: 3,
    title: "The Scientist",
    artist: "Coldplay",
    duration: "5:09",
    album: "Coldplay",
    coverArt: Scientist,
    audioFile: null
  },
  {
    id: 4,
    title: "Still into you",
    artist: "Paramore",
    duration: "3:43",
    album: "Paramore",
    coverArt: SIY,
    audioFile: null
  },
  { 
    id: 5,
    title: "Multo", 
    artist: "Cup of Joe",
    duration: "5:09",
    album: "Silakbo",
    coverArt: Silakbo,
    audioFile: "/songs/Multo.mp3"
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queue, setQueue] = useState([]);
  const audioRef = useRef(null);

  const filteredSongs = yourSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePlayPause = () => {
    if (!nowPlaying) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        setError("Playback failed");
        console.error("Playback error:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playSong = (song) => {
    if (!song.audioFile) {
      setError("No audio file available for this song");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      if (nowPlaying?.id !== song.id) {
        audioRef.current.src = song.audioFile;
        setNowPlaying(song);
      }
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(err => {
            setError(`Playback failed: ${err.message}`);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleAddToQueue = (song) => {
    setQueue(prev => [...prev, {
      id: song.id,
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      coverArt: song.coverArt
    }]);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle queue playback when current song ends
  useEffect(() => {
    const handleEnded = () => {
      if (queue.length > 0) {
        const nextSong = yourSongs.find(song => song.id === queue[0].id);
        if (nextSong) {
          setQueue(prev => prev.slice(1));
          playSong(nextSong);
        }
      } else {
        setIsPlaying(false);
      }
    };

    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, [queue]);

  return (
    <div className="h-screen w-screen text-white relative overflow-hidden">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={updateTime}
        onError={(e) => {
          setError("Audio playback error");
          console.error("Audio error:", e);
        }}
      />

      {/* Background Gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #060606 0%, #060606 25%, #06193a 40%, #132548 50%, #061631 60%, #060606 75%, #060606 100%)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          transform: 'scale(1.2)'
        }}
      ></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex gap-6 p-6">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 hidden lg:block overflow-y-auto scrollbar-minimalist">
          <ProfileCard 
            onSettingsClick={() => setShowSettings(true)}
            onLibraryClick={() => setShowLibrary(true)} 
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-minimalist flex flex-col">
          {/* Search Bar */}
          <div className="relative mb-4 p-6">
            <div className="relative w-200 mx-auto">
              <img 
                src={SearchIcon} 
                alt="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 z-20"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your songs..."
                className="w-full bg-gray-800/70 backdrop-blur-sm rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Your Songs Section */}
          <h1 className="text-2xl font-bold mb-4 px-6">Your Songs</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-grow overflow-y-auto scrollbar-minimalist pb-6 px-6">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <MusicCard 
                  key={song.id} 
                  {...song} 
                  onPlay={() => playSong(song)}
                  isPlaying={nowPlaying?.id === song.id && isPlaying}
                  isCurrentSong={nowPlaying?.id === song.id}
                  onAddToQueue={() => handleAddToQueue(song)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-10">
                No songs found matching "{searchQuery}"
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="w-80 flex-shrink-0 hidden xl:block overflow-y-auto scrollbar-minimalist">
          <NowPlayingCard 
            nowPlaying={nowPlaying}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={togglePlayPause}
            onSeek={handleSeek}
            formatTime={formatTime}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            isLoading={isLoading}
            error={error}
            queue={queue}
          />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      {/* Library Modal */}
      <LibraryModal 
        isOpen={showLibrary} 
        onClose={() => setShowLibrary(false)} 
        title="Your Library"
      />
    </div>
  );
}