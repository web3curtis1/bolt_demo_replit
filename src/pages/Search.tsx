import React, { useState, useEffect, useMemo } from 'react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useMusic();

  useEffect(() => {
    if (state.songs.length === 0) {
      fetchSongs();
    }
  }, [state.songs.length]);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/songs');
      const songs = await response.json();
      dispatch({ type: 'SET_SONGS', payload: songs });
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const filteredSongs = useMemo(() => {
    if (!query.trim()) return [];
    return state.songs.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, state.songs]);

  const playSong = (song: any) => {
    dispatch({ type: 'SET_CURRENT_SONG', payload: song });
    dispatch({ type: 'SET_PLAYING', payload: true });
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
        
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
          />
        </div>
      </div>

      {!query.trim() && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B', 'Indie', 'Alternative'].map((genre) => (
              <div
                key={genre}
                className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 h-32 flex items-end relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${
                    genre === 'Pop' ? '#ff6b6b, #ee5a24' :
                    genre === 'Rock' ? '#2f3542, #57606f' :
                    genre === 'Hip Hop' ? '#ffa502, #ff6348' :
                    genre === 'Electronic' ? '#3742fa, #2f3542' :
                    genre === 'Jazz' ? '#f39c12, #e67e22' :
                    '#6c5ce7, #a29bfe'
                  })`
                }}
              >
                <h3 className="text-white font-bold text-lg">{genre}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {query.trim() && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">
            {filteredSongs.length > 0 ? `Found ${filteredSongs.length} results` : 'No results found'}
          </h2>
          
          <div className="space-y-2">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 group cursor-pointer transition-colors"
                onClick={() => playSong(song)}
              >
                <div className="flex items-center justify-center w-10 h-10 text-gray-400 group-hover:text-white">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <Play className="hidden group-hover:block" size={16} />
                </div>
                
                <img
                  src={song.albumCover}
                  alt={song.title}
                  className="w-12 h-12 rounded"
                />
                
                <div className="flex-1">
                  <h3 className="text-white font-medium">{song.title}</h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
                
                <div className="text-gray-400 text-sm">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;