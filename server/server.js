const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const songs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumCover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 200
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    albumCover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 174
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    albumCover: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 178
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    albumCover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 203
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    albumCover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 141
  },
  {
    id: '6',
    title: 'Industry Baby',
    artist: 'Lil Nas X, Jack Harlow',
    albumCover: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 212
  },
  {
    id: '7',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    albumCover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 238
  },
  {
    id: '8',
    title: 'As It Was',
    artist: 'Harry Styles',
    albumCover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3',
    duration: 167
  }
];

const playlists = [
  {
    id: 'playlist1',
    name: 'Today\'s Top Hits',
    coverImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: ['1', '2', '3', '4'],
    description: 'The hottest tracks right now'
  },
  {
    id: 'playlist2',
    name: 'Pop Rising',
    coverImage: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: ['2', '4', '5', '8'],
    description: 'The future sound of pop music'
  },
  {
    id: 'playlist3',
    name: 'Viral Hits',
    coverImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: ['3', '5', '6', '7'],
    description: 'Songs trending everywhere'
  },
  {
    id: 'playlist4',
    name: 'Chill Vibes',
    coverImage: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: ['1', '7', '8'],
    description: 'Relax and unwind with these tracks'
  }
];

// Routes
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

app.get('/api/playlists/:id', (req, res) => {
  const playlist = playlists.find(p => p.id === req.params.id);
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  
  const playlistSongs = playlist.songs.map(songId => songs.find(s => s.id === songId)).filter(Boolean);
  res.json({ ...playlist, songs: playlistSongs });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});