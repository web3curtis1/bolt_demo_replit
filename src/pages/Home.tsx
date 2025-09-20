import React, { useEffect } from 'react';
import { Play } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

const Home: React.FC = () => {
  const { state, dispatch } = useMusic();

  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/playlists');
      const playlists = await response.json();
      dispatch({ type: 'SET_PLAYLISTS', payload: playlists });
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/songs');
      const songs = await response.json();
      dispatch({ type: 'SET_SONGS', payload: songs });
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const playPlaylist = (playlistId: string) => {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist && playlist.songs.length > 0) {
      const firstSong = state.songs.find(song => song.id === playlist.songs[0]);
      if (firstSong) {
        dispatch({ type: 'SET_CURRENT_SONG', payload: firstSong });
        dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: playlistId });
        dispatch({ type: 'SET_PLAYING', payload: true });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Good evening</h1>
        <p className="text-gray-400">Discover your next favorite song</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={playlist.coverImage}
                  alt={playlist.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => playPlaylist(playlist.id)}
                  className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 transform"
                >
                  <Play size={20} className="text-black fill-current ml-1" />
                </button>
              </div>
              <h3 className="text-white font-bold mb-2">{playlist.name}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {state.songs.slice(0, 6).map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-300 group cursor-pointer"
              onClick={() => {
                dispatch({ type: 'SET_CURRENT_SONG', payload: song });
                dispatch({ type: 'SET_PLAYING', payload: true });
              }}
            >
              <div className="relative mb-3">
                <img
                  src={song.albumCover}
                  alt={song.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play size={16} className="text-black fill-current ml-0.5" />
                </button>
              </div>
              <h4 className="text-white font-medium text-sm mb-1 truncate">{song.title}</h4>
              <p className="text-gray-400 text-xs truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;