import { useState, useRef, useEffect } from 'react';
import PlayIcon from '../assets/Icons/playw.svg';
import PauseIcon from '../assets/Icons/pausew.svg';
import DotsIcon from '../assets/Icons/dotsw.svg';

export default function MusicCard({ 
  title, 
  artist, 
  duration = "0:00", 
  album = "Unknown Album",
  coverArt = null,
  onPlay,
  isPlaying,
  isCurrentSong,
  onAddToQueue
}) {
  const [isHoveringDots, setIsHoveringDots] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div className="group bg-gray-800 hover:bg-gray-700 transition cursor-pointer rounded-lg h-[400px] w-full flex flex-col relative">
      {/* Album Art Section */}
      <div className="relative h-64 w-full">
        {coverArt ? (
          <img 
            src={coverArt}
            alt={`${title} album cover`}
            className={`w-full h-full object-cover rounded-t-lg transition ${
              isCurrentSong && isPlaying ? 'ring-2 ring-blue-500' : ''
            }`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
            }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-t-lg flex items-center justify-center ${
            isCurrentSong && isPlaying ? 'ring-2 ring-blue-500' : ''
          }`}>
            <span className="text-white text-4xl font-bold">
              {artist?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white text-lg truncate">{title}</h3>
          <p className="text-gray-300 text-md truncate">{artist}</p>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>{duration}</span>
          <span>•</span>
          <span className="truncate">{album}</span>
        </div>
      </div>

      {/* Button Container */}
      <div className="absolute bottom-3 right-3 flex items-center gap-[10px]">
        {/* Dots Button */}
        <button 
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            onAddToQueue();
          }}
          onMouseEnter={() => setIsHoveringDots(true)}
          onMouseLeave={() => setIsHoveringDots(false)}
          className={`p-2 rounded-full transition-all ${
            isHoveringDots ? 'bg-gray-600 scale-105' : 'bg-transparent'
          } opacity-0 group-hover:opacity-100 focus:opacity-100`}
          aria-label="Add to queue"
        >
          <img 
            src={DotsIcon} 
            alt="Add to queue" 
            className="w-5 h-5 filter brightness-0 invert-[0.7] hover:invert-[0.9]"
          />
        </button>
        
        {/* Play Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className={`${
            isCurrentSong ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-400 hover:bg-blue-300'
          } rounded-full p-2 flex items-center justify-center transition-all ${
            isCurrentSong ? 'scale-110' : 'group-hover:scale-110'
          }`}
        >
          <img 
            src={isCurrentSong && isPlaying ? PauseIcon : PlayIcon} 
            alt={isCurrentSong && isPlaying ? "Pause" : "Play"}
            className="w-5 h-5 filter brightness-0 invert-1"
          />
        </button>
      </div>

      {/* Playing indicator */}
      {isCurrentSong && (
        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {isPlaying ? 'Playing' : 'Paused'}
        </div>
      )}
    </div>
  );
}

MusicCard.defaultProps = {
  duration: "0:00",
  album: "Unknown Album",
  coverArt: null,
  isPlaying: false,
  isCurrentSong: false,
  onAddToQueue: () => {}
};