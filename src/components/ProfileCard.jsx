import { useState } from 'react';
import SearchIcon from '../assets/icons/searchw.svg';
import LibraryIcon from '../assets/icons/playlistw.svg';
import FavoritesIcon from '../assets/icons/favoritesb.svg';
import SettingsIcon from '../assets/icons/settingsw.svg';
import Profile from '../assets/images/kairu.jpg';

export default function ProfileCard({ onSettingsClick, onLibraryClick, onFavoritesClick }) {
  const navItems = [
    { name: 'Search', icon: SearchIcon },
    { name: 'Library', icon: LibraryIcon },
    { name: 'Favorites', icon: FavoritesIcon },
    { name: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div className="bg-blue-950 p-6 rounded-xl sticky top-6 h-[85vh] flex flex-col">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
          <img 
            src={Profile} 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-white">Kairu</h3>
          <p className="text-gray-400 text-sm">Auralis</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pr-2">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href="#" 
                className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-blue-900/50 transform hover:scale-[1.02] transition-all duration-200 ease-out"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.name === 'Settings') onSettingsClick();
                  if (item.name === 'Library') onLibraryClick();
                  if (item.name === 'Favorites') onFavoritesClick();
                }}
              >
                <img 
                  src={item.icon} 
                  alt={item.name}
                  className="w-5 h-5 filter brightness-0 invert-[0.7] hover:invert-[0.9] transition-all"
                />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-blue-900">
        <p className="text-gray-400 text-xs">All rights Reserved</p>
      </div>
    </div>
  );
}