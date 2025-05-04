import React from 'react';

export default function LibraryModal({ isOpen, onClose, title, songs = [], onCreatePlaylist }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-blue-950/90 rounded-xl p-6 w-full max-w-4xl mx-4 border border-blue-700/50 shadow-lg backdrop-blur-md overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl transition-colors"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>

        {/* Songs List */}
        {songs.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>You haven't added any songs to your library yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songs.map((song) => (
              <div 
                key={song.id} 
                className="flex items-center gap-4 bg-blue-900 p-4 rounded-lg hover:bg-blue-800 transition"
              >
                <div className="w-16 h-16 bg-blue-800 rounded overflow-hidden">
                  {song.coverArt ? (
                    <img
                      src={song.coverArt}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {song.artist?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium truncate">{song.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Playlist Button */}
        {songs.length === 0 && (
          <button
            onClick={onCreatePlaylist}
            className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-full shadow-lg transition-all"
          >
            Create Playlist
          </button>
        )}
      </div>
    </div>
  );
}