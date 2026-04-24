import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoShareOutline, IoPlayOutline } from 'react-icons/io5';
import { useTheme } from '../../../../context/ThemeContext';
import { useAppContent } from '../../../../hooks/useAppContent';

const SoundPage = () => {
  const { musicName } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { reelLibrary } = useAppContent();
  const decodedMusic = decodeURIComponent(musicName || '');

  // Check if this sound is already in favorites
  const [isSoundSaved, setIsSoundSaved] = useState(() => {
    const soundFavorites = JSON.parse(localStorage.getItem('soundFavorites') || '[]');
    return soundFavorites.includes(decodedMusic);
  });

  // Filter videos that use this sound
  const soundVideos = reelLibrary.filter(v =>
    v.music?.toLowerCase() === decodedMusic.toLowerCase()
  );
  // Fallback: show all videos if none match (for demo realism)
  const displayVideos = soundVideos.length > 0 ? soundVideos : reelLibrary;

  const handleAddToFavorites = () => {
    if (isSoundSaved) return;
    const soundFavorites = JSON.parse(localStorage.getItem('soundFavorites') || '[]');
    if (!soundFavorites.includes(decodedMusic)) {
      soundFavorites.push(decodedMusic);
      localStorage.setItem('soundFavorites', JSON.stringify(soundFavorites));
    }
    setIsSoundSaved(true);
  };

  return (
    <div className={`page-container flex flex-col overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-[#f8fafc] text-black'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 pt-4 pb-3 border-b shrink-0 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <button
          onClick={() => navigate('/user')}
          className={`w-8 h-8 flex items-center justify-center active:opacity-60 ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Music Charts badge */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[12px] font-bold px-3 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
          Music Charts
        </div>

        <button className={`w-8 h-8 flex items-center justify-center active:opacity-60 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <IoShareOutline size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Sound Card */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-start gap-4">
            {/* Thumbnail */}
            <div className={`relative w-[100px] h-[100px] rounded-xl overflow-hidden shrink-0 shadow-lg border ${isDarkMode ? 'bg-white/10 border-white/5' : 'bg-black/5 border-black/5'}`}>
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${decodedMusic}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                alt="sound thumbnail"
                className="w-full h-full object-cover opacity-90"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
                  <IoPlayOutline size={18} className="text-black ml-0.5" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-1">
              <h2 className={`text-[16px] font-bold mb-0.5 leading-tight line-clamp-2 drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {decodedMusic} -
              </h2>
              <p className={`text-[13px] mb-3 font-medium ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
                {displayVideos.length * 1000}+ posts
              </p>

              {/* Add to Favorites Button */}
              <button
                onClick={handleAddToFavorites}
                className={`flex items-center gap-2 border rounded-md px-4 py-2 text-[13px] font-semibold transition-all active:scale-95 ${
                  isSoundSaved
                    ? isDarkMode
                      ? 'border-white/10 text-white/40 bg-white/5'
                      : 'border-black/10 text-black/45 bg-black/5'
                    : isDarkMode
                      ? 'border-white/20 text-white bg-transparent hover:bg-white/5'
                      : 'border-black/15 text-black bg-transparent hover:bg-black/[0.03]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                  fill={isSoundSaved ? 'var(--color-accent-red, #FE2C55)' : 'none'}
                  stroke={isSoundSaved ? 'var(--color-accent-red, #FE2C55)' : 'currentColor'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                {isSoundSaved ? 'Saved ✓' : 'Add to Favorites'}
              </button>
            </div>
          </div>

          {/* Teal tooltip — hide once saved */}
          {!isSoundSaved && (
            <div className="mt-4 bg-gradient-to-r from-[#00b4d8] to-[#0096c7] text-white text-[12px] font-medium px-4 py-2.5 rounded-lg leading-snug shadow-md">
              Like this sound? Add it to Favorites to find or use it later.
            </div>
          )}

          {/* Credit line */}
          <p className={`text-[11px] mt-4 leading-relaxed line-clamp-2 ${isDarkMode ? 'text-white/40' : 'text-black/45'}`}>
            Contains music from: Mi Gente - Hugel Remix - J Balvin &amp; Willy William &amp; HUGEL
          </p>
        </div>

        {/* Divider */}
        <div className={`h-px mx-0 mb-0.5 mt-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-0.5">
          {[...displayVideos, ...displayVideos].slice(0, 9).map((video, idx) => (
            <div key={idx} className={`relative aspect-[3/5] overflow-hidden group ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
              {idx === 0 && (
                <div className="absolute top-1.5 left-1.5 z-10 bg-[#FE2C55] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm">
                  Original
                </div>
              )}
              <video
                src={video.url}
                poster={video.poster}
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Play count */}
              <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white text-[9px] font-bold drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="white">
                  <path d="M5 3l14 9-14 9z" />
                </svg>
                <span>{video.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "Use this sound" fixed CTA */}
      <div className="absolute bottom-[calc(var(--bottom-nav-height)+12px)] left-0 right-0 flex justify-center pointer-events-none z-10">
        <button
          onClick={() => navigate('/create')}
          className="pointer-events-auto flex items-center gap-2 bg-[#FE2C55] text-white px-8 py-3 rounded-full text-[15px] font-bold shadow-[0_4px_15px_rgba(254,44,85,0.4)] active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M15 10l4.553-2.07A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.916L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
          </svg>
          Use this sound
        </button>
      </div>
    </div>
  );
};

export default SoundPage;
