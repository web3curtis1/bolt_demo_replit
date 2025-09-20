import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  duration: number;
}

interface Playlist {
  id: string;
  name: string;
  coverImage: string;
  songs: string[];
  description: string;
}

interface MusicState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  songs: Song[];
  playlists: Playlist[];
  currentPlaylist: string | null;
}

type MusicAction =
  | { type: 'SET_CURRENT_SONG'; payload: Song }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_SONGS'; payload: Song[] }
  | { type: 'SET_PLAYLISTS'; payload: Playlist[] }
  | { type: 'SET_CURRENT_PLAYLIST'; payload: string | null }
  | { type: 'NEXT_SONG' }
  | { type: 'PREVIOUS_SONG' };

const initialState: MusicState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  songs: [],
  playlists: [],
  currentPlaylist: null,
};

const musicReducer = (state: MusicState, action: MusicAction): MusicState => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_SONGS':
      return { ...state, songs: action.payload };
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload };
    case 'SET_CURRENT_PLAYLIST':
      return { ...state, currentPlaylist: action.payload };
    case 'NEXT_SONG': {
      if (!state.currentSong || state.songs.length === 0) return state;
      const currentIndex = state.songs.findIndex(song => song.id === state.currentSong?.id);
      const nextIndex = (currentIndex + 1) % state.songs.length;
      return { ...state, currentSong: state.songs[nextIndex] };
    }
    case 'PREVIOUS_SONG': {
      if (!state.currentSong || state.songs.length === 0) return state;
      const currentIndex = state.songs.findIndex(song => song.id === state.currentSong?.id);
      const previousIndex = (currentIndex - 1 + state.songs.length) % state.songs.length;
      return { ...state, currentSong: state.songs[previousIndex] };
    }
    default:
      return state;
  }
};

const MusicContext = createContext<{
  state: MusicState;
  dispatch: React.Dispatch<MusicAction>;
  audioRef: React.RefObject<HTMLAudioElement>;
} | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => dispatch({ type: 'SET_CURRENT_TIME', payload: audio.currentTime });
    const updateDuration = () => dispatch({ type: 'SET_DURATION', payload: audio.duration });

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => dispatch({ type: 'NEXT_SONG' }));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [state.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = state.volume;
  }, [state.volume]);

  return (
    <MusicContext.Provider value={{ state, dispatch, audioRef }}>
      {children}
      <audio ref={audioRef} src={state.currentSong?.audioUrl} />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export type { Song, Playlist };