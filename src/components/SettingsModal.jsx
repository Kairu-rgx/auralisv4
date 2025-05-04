import { useState } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
  // State for interactive elements
  const [crossfadeEnabled, setCrossfadeEnabled] = useState(false);
  const [gaplessEnabled, setGaplessEnabled] = useState(true);
  const [audioQuality, setAudioQuality] = useState('High (320kbps)');
  const [selectedTheme, setSelectedTheme] = useState('Dark');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [cacheSize, setCacheSize] = useState(65);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-blue-950/90 rounded-xl p-6 w-full max-w-md mx-4 border border-blue-700/50 shadow-lg backdrop-blur-md overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl transition-colors"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Settings
        </h2>
        
        <div className="space-y-6">
          {/* Account Section - Placeholder (non-interactive) */}
          <div className="setting-section">
            <h3 className="section-header">Account</h3>
            <div className="setting-item">
              <div className="flex justify-between items-center">
                <span>Profile</span>
                <span className="text-blue-400 text-sm">Edit</span>
              </div>
            </div>
          </div>

          {/* Playback Section - Interactive */}
          <div className="setting-section">
            <h3 className="section-header">Playback</h3>
            <div className="setting-item">
              <label className="flex justify-between items-center cursor-pointer">
                <span>Crossfade</span>
                <button 
                  className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${crossfadeEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
                  onClick={() => setCrossfadeEnabled(!crossfadeEnabled)}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${crossfadeEnabled ? 'translate-x-4' : ''}`}></span>
                </button>
              </label>
            </div>
            <div className="setting-item">
              <label className="flex justify-between items-center cursor-pointer">
                <span>Gapless Playback</span>
                <button 
                  className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${gaplessEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
                  onClick={() => setGaplessEnabled(!gaplessEnabled)}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${gaplessEnabled ? 'translate-x-4' : ''}`}></span>
                </button>
              </label>
            </div>
            <div className="setting-item">
              <h4 className="setting-label">Audio Quality</h4>
              <select 
                className="setting-select"
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value)}
              >
                <option>High (320kbps)</option>
                <option>Medium (192kbps)</option>
                <option>Low (128kbps)</option>
              </select>
            </div>
          </div>

          {/* Appearance Section - Interactive */}
          <div className="setting-section">
            <h3 className="section-header">Appearance</h3>
            <div className="setting-item">
              <h4 className="setting-label">Theme</h4>
              <div className="flex gap-3 mt-2">
                {['Dark', 'Light', 'System'].map((theme) => (
                  <button
                    key={theme}
                    className={`flex-1 py-2 rounded-md border text-center transition-colors ${selectedTheme === theme ? 'bg-blue-600 border-blue-400' : 'bg-blue-900/50 border-blue-900 hover:bg-blue-900/70'}`}
                    onClick={() => setSelectedTheme(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            <div className="setting-item">
              <h4 className="setting-label">Player Color</h4>
              <div className="flex gap-2 mt-2 flex-wrap">
                {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-white scale-105' : 'border-transparent hover:border-blue-200'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Section - Semi-interactive */}
          <div className="setting-section">
            <h3 className="section-header">Advanced</h3>
            <div className="setting-item">
              <h4 className="setting-label">Cache Size</h4>
              <div className="flex items-center gap-3 mt-2">
                <progress 
                  className="flex-1 h-2 rounded-full bg-blue-900/30 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-500"
                  value={cacheSize}
                  max="100"
                />
                <span className="text-sm text-gray-400">
                  {Math.round((cacheSize / 100) * 2 * 10) / 10}GB/2GB
                </span>
              </div>
              <button 
                className="text-blue-400 hover:text-blue-300 text-sm mt-1 transition-colors"
                onClick={() => setCacheSize(0)}
              >
                Clear Cache
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors duration-200"
              onClick={() => {
                console.log('Settings saved:', { 
                  crossfadeEnabled, 
                  gaplessEnabled, 
                  audioQuality, 
                  selectedTheme, 
                  selectedColor 
                });
                onClose();
              }}
            >
              Save Changes
            </button>
            <button 
              className="flex-1 bg-transparent border border-blue-700 hover:bg-blue-900/30 text-white py-3 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}