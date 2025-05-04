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
  queue = []
}) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl sticky top-6">
      <h3 className="font-bold text-white mb-6">Now Playing</h3>
      
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
      ) : nowPlaying ? (
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
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
          
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate">{nowPlaying.title}</h4>
              <p className="text-gray-400 text-sm truncate">{nowPlaying.artist}</p>
            </div>
            <button 
              onClick={onPlayPause}
              className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 transition flex-shrink-0 ml-4"
              disabled={isLoading}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={onSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{nowPlaying.duration || formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Volume control */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-gray-400 text-sm">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-4 mb-6 text-center text-gray-400">
          No song selected
        </div>
      )}

      {/* Queue Section - Only shows when there are items */}
      {queue.length > 0 && (
        <>
          <h4 className="text-gray-300 font-medium mb-3">Queue</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {queue.map((song, index) => (
              <div key={`${song.id}-${index}`} className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
                <div className="w-10 h-10 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                  {song.coverArt && (
                    <img src={song.coverArt} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{song.title}</p>
                  <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </div>
                <span className="text-gray-400 text-xs flex-shrink-0">{song.duration}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}