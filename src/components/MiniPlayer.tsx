import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

const MiniPlayer: React.FC = () => {
  const { state, dispatch } = useMusic();

  if (!state.currentSong) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * state.duration;
    
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (audio) {
      audio.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-20">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/3">
          <img
            src={state.currentSong.albumCover}
            alt={state.currentSong.title}
            className="w-14 h-14 rounded-lg"
          />
          <div>
            <p className="text-white font-medium">{state.currentSong.title}</p>
            <p className="text-gray-400 text-sm">{state.currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch({ type: 'PREVIOUS_SONG' })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {state.isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={() => dispatch({ type: 'NEXT_SONG' })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10">
              {formatTime(state.currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-green-500 rounded-full"
                style={{
                  width: `${(state.currentTime / state.duration) * 100 || 0}%`,
                }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(state.duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-1/3 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.volume}
            onChange={handleVolumeChange}
            className="w-24 accent-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;