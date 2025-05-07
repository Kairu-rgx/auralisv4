import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import MusicCard from './components/MusicCard';
import NowPlayingCard from './components/NowPlayingCard';
import SettingsModal from './components/SettingsModal';
import LibraryModal from './components/LibraryModal';
import FavoritesModal from './components/FavoritesModal';
import SearchIcon from './assets/Icons/searchw.svg';
import './index.css';

import LRPD from './assets/Images/LRPD.jpg';
import Always from './assets/Images/Always.jpg';
import Scientist from './assets/Images/Scientist.jpg';
import SIY from './assets/Images/SIY.jpg';
import Silakbo from './assets/Images/Silakbo.jpg';
import Woman from './assets/Images/Woman.jpg';
import Juicy from './assets/Images/Juicy.jpg';
import IDDD from './assets/Images/IDDD.jpg';
import Streets from './assets/Images/Streets.jpg';
import KissMeMore from './assets/Images/KissMeMore.jpg';
import LikeThat from './assets/Images/LikeThat.jpg';
import FeelIt from './assets/Images/FeelIt.jpg';
import BackStreetGirl from './assets/Images/BackStreetGirl.jpg';
import Awkward from './assets/Images/Awkward.jpg';
import DontForgetAboutMe from './assets/Images/DontForgetAboutMe.jpg';
import MoreThanJustFriends from './assets/Images/MoreThanJustFriends.jpg';
import Worthless from './assets/Images/Worthless.jpg';
import DeathCamp from './assets/Images/DeathCamp.jpg';


const yourSongs = [
  {
    id: 1,
    title: "Like Real People Do",
    artist: "Hozier",
    duration: "3:45",
    album: "Hozier",
    coverArt: LRPD,
    audioFile: "/songs/LRPD.mp3"
  },
  {
    id: 2,
    title: "Always",
    artist: "Daniel Caesar",
    duration: "4:02",
    album: "Freudian",
    coverArt: Always,
    audioFile:"/songs/Always.mp3"
  },
  {
    id: 3,
    title: "The Scientist",
    artist: "Coldplay",
    duration: "5:09",
    album: "Coldplay",
    coverArt: Scientist,
    audioFile: "/songs/Scientist.mp3"
  },
  {
    id: 4,
    title: "Still into you",
    artist: "Paramore",
    duration: "3:43",
    album: "Paramore",
    coverArt: SIY,
    audioFile: "/songs/SIY.mp3"
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
  {
    id: 6,
    title: "Woman",
    artist: 'Doja Cat',
    duration: "2:52",
    album: "Planet Her",
    coverArt: Woman,
    audioFile: "/songs/Woman.mp3"
  },
  {
    id: 7,
    title: "Juicy",
    artist: "Doja Cat",
    duration: "3:19",
    album: "Pink",
    coverArt: Juicy,
    audioFile: "/songs/Juicy.mp3"
  },
  {
    id: 8,
    title: "IDDD",
    artist: "Doja Cat",
    duration: "2:19",
    album: "Planet Her",
    coverArt: IDDD,
    audioFile: "/songs/IDDD.mp3"
  },
  {
    id: 9,
    title: "Streets",
    artist: "Doja Cat",
    duration: "3:46",
    album: "Planet Her",
    coverArt: Streets,
    audioFile: "/songs/Streets.mp3"
  },
  {
    id: 10,
    title: "Kiss Me More",
    artist: "Doja Cat",
    duration: "3:29",
    album: "Planet Her",
    coverArt: KissMeMore,
    audioFile: "/songs/KissMeMore.mp3"
  },
  {
    id: 11,
    title: "Like That",
    artist: "Doja Cat",
    duration: "2:44",
    album: "Hot Pink",
    coverArt: LikeThat,
    audioFile: "/songs/LikeThat.mp3"
  },
  {
    id: 12,
    title: "Back Street Girl",
    artist: "D4VID",
    duration: "4:11",
    album: "Back Street Girl",
    coverArt: BackStreetGirl,
    audioFile: "/songs/BackStreetGirl.mp3"
  },
  {
    id: 13,
    title: "Feel It",
    artist: "D4VID",
    duration: "2;38",
    album: "Feel It From(INVINCIBLE)",
    coverArt: FeelIt,
    audioFile: "/songs/FeelIt.mp3"
  },
  {
    id: 14,
    title: "Awkward",
    artist: "D4VID",
    duration: "3:48",
    album: "Awkward",
    coverArt: Awkward,
    audioFile: "/songs/Awkward.mp3"
  },
  {
    id: 15,
    title: "Dont Forget About Me",
    artist: "D4VID",
    duration: "2:30",
    album: "D4VID",
    coverArt: DontForgetAboutMe,
    audioFile: "/songs/DontForgetAboutMe.mp3"
  },
  {
    id: 16,
    title: "More Than Just Friends",
    artist: "D4VID",
    duration: "2:07",
    album: "D4VID",
    coverArt: MoreThanJustFriends,
    audioFile: "/songs/MoreThanJustFriends.mp3"
  },
  {
    id: 17,
    title: "Worthless",
    artist: "D4VID",
    duration: "2:44",
    album: "D4VID",
    coverArt: Worthless,
    audioFile: "/songs/WORTHLESS.mp3"
  },
  {
    id: 18,
    title: "Death Camp",
    artist: "Tyler The Creator",
    duration: "3:10",
    album: "Tyler The Creator",
    coverArt: DeathCamp,
    audioFile: "/songs/DEATHCAMP.mp3"
  },
  
];


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queue, setQueue] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
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
      console.error("No audio file available for this song");
      return;
    }

    setNowPlaying(song);
    setIsLoading(true);
    setHistory(prev => [...prev, song]);
    audioRef.current.src = song.audioFile;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Playback error:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
  };

  const handleAddToQueue = (song) => {
    setQueue(prev => [...prev, {
      id: song.id,
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      coverArt: song.coverArt,
      audioFile: song.audioFile
    }]);
  };

  const handleAddToFavorites = (song) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === song.id);
      if (exists) {
        return prev.filter(fav => fav.id !== song.id);
      }
      return [...prev, {
        id: song.id,
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        coverArt: song.coverArt,
        audioFile: song.audioFile
      }];
    });
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

  const handleNextSong = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playSong(nextSong);
    } else {
      const availableSongs = yourSongs.filter(song => 
        !nowPlaying || song.id !== nowPlaying.id
      );
      
      if (availableSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        const randomSong = availableSongs[randomIndex];
        playSong(randomSong);
      } else {
        setNowPlaying(null);
        setIsPlaying(false);
      }
    }
  };

  const handlePreviousSong = () => {
    if (history.length > 1) {
      const previousSong = history[history.length - 2];
      setHistory(prev => prev.slice(0, -1));
      playSong(previousSong);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setNowPlaying(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setHistory([]);
  };

  const handleSongEnd = () => {
    if (isLooping && nowPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    handleNextSong();
  };

  useEffect(() => {
    if (!nowPlaying && queue.length > 0) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playSong(nextSong);
    }
  }, [nowPlaying, queue]);

  const handleRemoveFromQueue = (song) => {
    setQueue(prevQueue => prevQueue.filter(q => q.id !== song.id));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, nowPlaying]);

  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping]);

  return (
    <div className="h-screen w-screen text-white relative overflow-hidden">
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleSongEnd}
        onLoadedMetadata={updateTime}
        onError={(e) => {
          setError("Audio playback error");
          console.error("Audio error:", e);
        }}
      />

      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #060606 0%, #060606 25%, #06193a 40%, #132548 50%, #061631 60%, #060606 75%, #060606 100%)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          transform: 'scale(1.2)'
        }}
      ></div>

      <div className="absolute inset-0 flex gap-6 p-6">
        <div className="w-64 flex-shrink-0 hidden lg:block overflow-y-auto scrollbar-minimalist">
          <ProfileCard 
            onSettingsClick={() => setShowSettings(true)}
            onLibraryClick={() => setShowLibrary(true)}
            onFavoritesClick={() => setShowFavorites(true)} 
          />
        </div>

        <main className="flex-1 overflow-y-auto scrollbar-minimalist flex flex-col">
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
                  onAddToFavorites={() => handleAddToFavorites(song)}
                  isFavorite={favorites.some(fav => fav.id === song.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-10">
                No songs found matching "{searchQuery}"
              </div>
            )}
          </div>
        </main>

        {nowPlaying && (
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
              onRemoveFromQueue={handleRemoveFromQueue}
              onNext={handleNextSong}
              onPrevious={handlePreviousSong}
              onShuffle={toggleShuffle}
              onToggleLoop={toggleLoop}
              isLooping={isLooping}
              isShuffled={isShuffled}
              hasPrevious={history.length > 1}
              onStop={handleStop}
            />
          </div>
        )}
      </div>

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      <LibraryModal 
        isOpen={showLibrary} 
        onClose={() => setShowLibrary(false)} 
        title="Your Library"
      />

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onPlay={playSong}
        onRemove={(song) => setFavorites(favorites.filter(fav => fav.id !== song.id))}
      />
    </div>
  );
}