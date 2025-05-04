import React from 'react';
import HLineIcon from '../assets/Icons/hlinew.svg'; // Import the icon

export default function FavoritesModal({ isOpen, onClose, favorites = [], onPlay, onRemove }) {
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
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          Favorites
        </h2>

        {/* Favorites List */}
        <div className="space-y-6">
          {favorites.length === 0 ? (
            <p className="text-gray-400">You haven't added any songs to your favorites yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[400px] scrollbar-minimalist">
              {favorites.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between bg-blue-900 p-4 rounded-lg hover:bg-blue-800 transition"
                >
                  <div className="flex items-center gap-4">
                    {/* Album Art */}
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

                    {/* Song Info */}
                    <div>
                      <h3 className="text-white font-medium truncate">{song.title}</h3>
                      <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onPlay(song)}
                      className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => onRemove(song)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition"
                    >
                      <img src={HLineIcon} alt="Remove" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button 
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}