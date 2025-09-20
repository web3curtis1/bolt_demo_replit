import React, { useEffect } from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

const Playlists: React.FC = () => {
  const { state, dispatch } = useMusic();

  useEffect(() => {
    if (state.playlists.length === 0) {
      fetchPlaylists();
    }
    if (state.songs.length === 0) {
      fetchSongs();
    }
  }, [state.playlists.length, state.songs.length]);

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

  const playSong = (song: any) => {
    dispatch({ type: 'SET_CURRENT_SONG', payload: song });
    dispatch({ type: 'SET_PLAYING', payload: true });
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

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPlaylistSongs = (playlistId: string) => {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (!playlist) return [];
    return playlist.songs.map(songId => state.songs.find(song => song.id === songId)).filter(Boolean);
  };

  if (state.playlists.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Loading playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Library</h1>
        <p className="text-gray-400">Your playlists and saved music</p>
      </div>

      <div className="space-y-8">
        {state.playlists.map((playlist) => {
          const playlistSongs = getPlaylistSongs(playlist.id);
          const totalDuration = playlistSongs.reduce((acc, song) => acc + (song?.duration || 0), 0);
          
          return (
            <div key={playlist.id} className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={playlist.coverImage}
                  alt={playlist.name}
                  className="w-48 h-48 rounded-lg shadow-xl"
                />
                
                <div className="flex-1 pt-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">Playlist</p>
                  <h2 className="text-4xl font-bold text-white mb-4">{playlist.name}</h2>
                  <p className="text-gray-300 mb-4">{playlist.description}</p>
                  <p className="text-gray-400 text-sm">
                    {playlistSongs.length} songs • {Math.floor(totalDuration / 60)} min {Math.floor(totalDuration % 60)} sec
                  </p>
                  
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() => playPlaylist(playlist.id)}
                      className="bg-green-500 hover:bg-green-400 text-black rounded-full p-4 transition-colors"
                    >
                      <Play size={24} className="fill-current ml-1" />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <MoreHorizontal size={24} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm mb-4 px-4">
                  <div className="col-span-1">#</div>
                  <div className="col-span-7">Title</div>
                  <div className="col-span-3">Artist</div>
                  <div className="col-span-1">Duration</div>
                </div>
                
                <div className="space-y-2">
                  {playlistSongs.map((song, index) => (
                    song && (
                      <div
                        key={song.id}
                        className="grid grid-cols-12 gap-4 items-center p-2 rounded hover:bg-gray-800 group cursor-pointer transition-colors"
                        onClick={() => playSong(song)}
                      >
                        <div className="col-span-1 flex items-center justify-center text-gray-400 group-hover:text-white">
                          <span className="group-hover:hidden">{index + 1}</span>
                          <Play className="hidden group-hover:block" size={16} />
                        </div>
                        
                        <div className="col-span-7 flex items-center gap-3">
                          <img
                            src={song.albumCover}
                            alt={song.title}
                            className="w-10 h-10 rounded"
                          />
                          <span className="text-white font-medium">{song.title}</span>
                        </div>
                        
                        <div className="col-span-3 text-gray-400">
                          {song.artist}
                        </div>
                        
                        <div className="col-span-1 text-gray-400 text-sm">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;