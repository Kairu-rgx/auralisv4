import React, { useState, useEffect } from 'react';
import PlayIcon from '../assets/Icons/playw.svg';
import PauseIcon from '../assets/Icons/pausew.svg';
import PreviousIcon from '../assets/Icons/previousw.svg';
import NextIcon from '../assets/Icons/nextw.svg';
import ShuffleIcon from '../assets/Icons/shufflew.svg';
import LoopIcon from '../assets/Icons/loopw.svg';
import HLineIcon from '../assets/Icons/hlinew.svg';
import NVolumeIcon from '../assets/Icons/nvolumew.svg';
import LVolumeIcon from '../assets/Icons/lvolumew.svg';
import HVolumeIcon from '../assets/Icons/hvolumew.svg';

export default function NowPlayingCard({ 
  nowPlaying, 
  isPlaying, 
  currentTime, 
  duration, 
  onPlayPause, 
  onSeek,
  formatTime,
  volume,
  onVolumeChange,
  isLoading,
  error,
  queue = [],
  onRemoveFromQueue,
  onNext,
  onPrevious,
  onShuffle,
  onToggleLoop,
  isLooping,
  isShuffled,
  hasPrevious,
  onStop
}) {
  const [albumArtKey, setAlbumArtKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);

  const getVolumeIcon = () => {
    if (volume === 0) return NVolumeIcon;
    if (volume < 0.5) return LVolumeIcon;
    return HVolumeIcon;
  };

  const handleNext = async () => {
    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onNext();
    setAlbumArtKey(prev => prev + 1);
    setIsAnimating(false);
  };

  const handlePrevious = async () => {
    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onPrevious();
    setAlbumArtKey(prev => prev + 1);
    setIsAnimating(false);
  };

  const handleStop = () => {
    setExitAnimation(true);
    setTimeout(() => {
      onStop();
      setExitAnimation(false);
    }, 300);
  };

  useEffect(() => {
    if (nowPlaying) {
      setAlbumArtKey(prev => prev + 1);
    }
  }, [nowPlaying]);

  if (exitAnimation) {
    return (
      <div className="bg-gray-800 p-5 rounded-xl sticky top-6 flex flex-col animate-fadeOut">
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
            <div className="animate-slideOutRight">
              {nowPlaying?.coverArt ? (
                <img 
                  src={nowPlaying.coverArt} 
                  alt={nowPlaying.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {nowPlaying?.artist?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!nowPlaying) return null;

  return (
    <div className="bg-gray-800 p-5 rounded-xl sticky top-6 flex flex-col animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white">Now Playing</h3>
        <button 
          onClick={handleStop}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-red-500/80 transition-all duration-200"
          title="Stop playback"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {isLoading ? (
        <div className="bg-gray-700 rounded-lg p-4 mb-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-full h-48 bg-gray-600 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-gray-700 rounded-lg p-4 mb-6 text-center text-red-400">
          {error}
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="w-full h-48 rounded-md mb-4 overflow-hidden relative">
            <div 
              key={albumArtKey}
              className={`absolute inset-0 ${isAnimating ? 'animate-slideOutLeft' : 'animate-slideInRight'}`}
            >
              {nowPlaying.coverArt ? (
                <img 
                  src={nowPlaying.coverArt} 
                  alt={nowPlaying.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {nowPlaying.artist?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate">{nowPlaying.title}</h4>
              <p className="text-gray-400 text-sm truncate">{nowPlaying.artist}</p>
            </div>
          </div>
        </div>
      )}

      {queue.length > 0 && (
        <>
          <h4 className="text-gray-300 font-medium mb-3">Queue</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-minimalist">
            {queue.map((song, index) => (
              <div 
                key={`${song.id}-${index}`} 
                className="flex items-center gap-4 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition"
              >
                <div className="w-12 h-12 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                  {song.coverArt ? (
                    <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {song.artist?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-medium truncate">{song.title}</h5>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
                <button
                  onClick={() => onRemoveFromQueue(song)}
                  className="w-8 h-8 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition"
                >
                  <img src={HLineIcon} alt="Remove" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={onSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{nowPlaying?.duration || formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button 
            onClick={onShuffle} 
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              isShuffled 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
            title="Shuffle"
          >
            <img 
              src={ShuffleIcon} 
              alt="Shuffle" 
              className="w-5 h-5"
            />
          </button>
          
          <button 
            onClick={handlePrevious} 
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              !hasPrevious 
                ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
            disabled={!hasPrevious}
            title="Previous"
          >
            <img 
              src={PreviousIcon} 
              alt="Previous" 
              className="w-5 h-5"
            />
          </button>
          
          <button 
            onClick={onPlayPause} 
            className="p-3 w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-200 flex items-center justify-center transform hover:scale-105 text-white shadow-md"
            title={isPlaying ? "Pause" : "Play"}
          >
            <img 
              src={isPlaying ? PauseIcon : PlayIcon} 
              alt="Play/Pause" 
              className="w-6 h-6"
            />
          </button>
          
          <button 
            onClick={handleNext} 
            className="p-2 w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-200 text-gray-300"
            title="Next"
          >
            <img 
              src={NextIcon} 
              alt="Next" 
              className="w-5 h-5"
            />
          </button>
          
          <button 
            onClick={onToggleLoop} 
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              isLooping 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
            title="Loop"
          >
            <img 
              src={LoopIcon} 
              alt="Loop" 
              className="w-5 h-5"
            />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-300 hover:text-white transition">
            <img 
              src={getVolumeIcon()} 
              alt="Volume" 
              className="w-5 h-5"
            />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onVolumeChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>
    </div>
  );
}