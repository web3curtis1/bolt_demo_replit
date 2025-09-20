# Boltify - Spotify Clone

A beautiful, fully-functional Spotify clone built with React, TypeScript, Tailwind CSS, and Express.js. Features a modern dark UI with real music playback capabilities and responsive design.

## ✨ Features

### Frontend
- **Modern UI**: Dark theme with Spotify-inspired design and smooth animations
- **Full Navigation**: Home, Search, and Library pages with React Router
- **Music Player**: Complete playback controls with progress tracking and volume control
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **State Management**: React Context for seamless music state management
- **Real-time Search**: Instant search results with filtering
- **Interactive Elements**: Hover effects, micro-interactions, and smooth transitions

### Backend
- **RESTful API**: Express.js server with CORS support
- **Mock Data**: Sample songs and playlists for demonstration
- **Structured Endpoints**: `/api/songs` and `/api/playlists` endpoints

### Key Components
- **MiniPlayer**: Bottom-docked music player with full controls
- **Playlist Management**: Featured playlists with play functionality
- **Search System**: Real-time song and artist search
- **Music Context**: Centralized state management for playback

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd boltify
   npm install
   ```

2. **Start the development servers**
   ```bash
   npm run dev
   ```
   This will start both the React frontend (port 3000) and Express backend (port 3001) concurrently.

3. **Open your browser**
   Navigate to `http://localhost:3000` to see Boltify in action!

## 🎵 Usage

### Playing Music
- Click on any song or playlist to start playback
- Use the mini player at the bottom for play/pause, skip, and volume controls
- Click on the progress bar to seek to different positions

### Navigation
- **Home**: Browse featured playlists and recently played songs
- **Search**: Find songs by title or artist name
- **Library**: View and manage your playlists

### Features
- Real-time search with instant results
- Playlist management with full song listings
- Responsive design that works on all devices
- Smooth animations and hover effects

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Lucide React** for icons
- **HTML5 Audio API** for music playback

### Backend
- **Express.js** server
- **CORS** middleware
- **Mock JSON data** for songs and playlists

## 📁 Project Structure

```
boltify/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation sidebar
│   │   └── MiniPlayer.tsx  # Bottom music player
│   ├── contexts/           # React Context providers
│   │   └── MusicContext.tsx # Music state management
│   ├── pages/              # Route components
│   │   ├── Home.tsx        # Homepage with featured content
│   │   ├── Search.tsx      # Search functionality
│   │   └── Playlists.tsx   # Playlist management
│   ├── App.tsx             # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── server/
│   └── server.js          # Express backend server
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🎨 Design Features

- **Dark Theme**: Professional dark UI inspired by Spotify
- **Green Accents**: Spotify's signature green color (#1DB954)
- **Smooth Animations**: Hover effects and transitions throughout
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Modern Typography**: Clear hierarchy with proper contrast ratios
- **Interactive Elements**: Play buttons, progress bars, and hover states

## 🔧 API Endpoints

### Songs
- `GET /api/songs` - Retrieve all available songs
- Returns: Array of song objects with id, title, artist, albumCover, audioUrl, and duration

### Playlists
- `GET /api/playlists` - Retrieve all playlists
- `GET /api/playlists/:id` - Get specific playlist with songs
- Returns: Playlist objects with song arrays

## 🚀 Development

### Running Individual Services
```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

### Building for Production
```bash
npm run build
```

## 📱 Mobile Support

Boltify is fully responsive and provides an excellent experience on:
- Desktop computers (1200px+)
- Tablets (768px - 1024px)
- Mobile phones (320px - 767px)

## 🎯 Future Enhancements

- User authentication and profiles
- Real music streaming integration
- Custom playlist creation
- Offline playback support
- Social features and sharing
- Advanced search filters
- Queue management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎵 Demo

The application includes sample songs and playlists for immediate testing. All mock data is provided through the Express backend, making it easy to expand with real music services.

---

**Note**: This is a demonstration project using mock audio URLs. For production use, you would integrate with actual music streaming APIs like Spotify Web API, Apple Music API, or similar services.