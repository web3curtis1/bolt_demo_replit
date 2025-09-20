import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library } from 'lucide-react';

const Navbar: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/playlists', icon: Library, label: 'Your Library' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-black p-6 flex flex-col z-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Boltify</h1>
      </div>
      
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-800">
        <div className="text-gray-400 text-sm">
          <p>Recently Played</p>
          <div className="mt-4 space-y-2">
            <div className="text-white text-sm hover:bg-gray-800 p-2 rounded cursor-pointer">
              Liked Songs
            </div>
            <div className="text-white text-sm hover:bg-gray-800 p-2 rounded cursor-pointer">
              Recently Added
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;