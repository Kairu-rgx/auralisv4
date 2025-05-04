import React from 'react';

export default function LibraryModal({ isOpen, onClose, title }) {
  const libraryItems = [
    { id: 1, name: "Liked Songs", type: "Playlist" },
    { id: 2, name: "Chill Vibes", type: "Playlist" },
    { id: 3, name: "Workout Mix", type: "Playlist" },
    { id: 4, name: "Top Hits 2025", type: "Playlist" },
    { id: 5, name: "Relaxing Piano", type: "Playlist" },
    { id: 6, name: "Focus Beats", type: "Playlist" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-blue-950 rounded-lg shadow-lg w-[90%] max-w-lg p-6 relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full hover:bg-blue-900 transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search your library..."
            className="w-full bg-blue-900 border border-blue-700 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Library Items */}
        <div className="overflow-y-auto max-h-64 scrollbar-minimalist">
          <ul className="space-y-3">
            {libraryItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-blue-900 p-3 rounded-lg hover:bg-blue-800 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-800 rounded flex items-center justify-center">
                    <span className="text-lg">🎵</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-800 p-2 rounded transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add play functionality here
                    }}
                  >
                    Play
                  </button>
                  <button 
                    className="text-gray-400 hover:text-white p-1 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to queue functionality here
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}