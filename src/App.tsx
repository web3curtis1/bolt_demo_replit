import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './contexts/MusicContext';
import Navbar from './components/Navbar';
import MiniPlayer from './components/MiniPlayer';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlists from './pages/Playlists';

function App() {
  return (
    <MusicProvider>
      <Router>
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
          <Navbar />
          <main className="ml-64 pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlists" element={<Playlists />} />
            </Routes>
          </main>
          <MiniPlayer />
        </div>
      </Router>
    </MusicProvider>
  );
}

export default App;