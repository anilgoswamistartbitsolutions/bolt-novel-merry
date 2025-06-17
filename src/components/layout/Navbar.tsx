import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Bell, 
  User, 
  Moon, 
  Sun, 
  Palette,
  Menu,
  X,
  Home,
  Compass,
  Trophy,
  Library,
  MessageSquare,
  PenTool,
  Settings,
  LogOut,
  Heart,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const themeMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/rankings', label: 'Rankings', icon: Trophy },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/community', label: 'Community', icon: MessageSquare },
  ];

  const themeIcons = {
    light: Sun,
    dark: Moon,
    sepia: Palette
  };

  const ThemeIcon = themeIcons[theme];

  const notifications = [
    {
      id: 1,
      type: 'chapter',
      title: 'New Chapter Available',
      message: 'Chapter 157 of "Chronicles of Mystic Realms" is now available',
      time: '5 minutes ago',
      read: false,
      icon: BookOpen
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment',
      message: 'Someone replied to your comment on "Digital Hearts"',
      time: '1 hour ago',
      read: false,
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You earned the "Speed Reader" badge!',
      time: '2 hours ago',
      read: true,
      icon: Trophy
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          theme === 'sepia' 
            ? 'bg-sepia-50/90 border-sepia-200' 
            : 'bg-white/80 dark:bg-slate-900/80 border-gray-200 dark:border-gray-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 text-white" />
              </motion.div>
              <span className={`font-bold text-xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent group-hover:from-accent-600 group-hover:to-primary-600 transition-all duration-300 ${
                theme === 'sepia' ? 'text-sepia-800' : ''
              }`}>
                Novel-Merry
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? theme === 'sepia'
                          ? 'bg-sepia-200 text-sepia-800'
                          : 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                        : theme === 'sepia'
                          ? 'text-sepia-700 hover:bg-sepia-100'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <Link 
                to="/search" 
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'sepia'
                    ? 'text-sepia-700 hover:bg-sepia-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Theme Toggle */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'sepia'
                      ? 'text-sepia-700 hover:bg-sepia-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <ThemeIcon className="w-5 h-5" />
                </button>
                
                <AnimatePresence>
                  {showThemeMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 py-2 w-36 rounded-lg shadow-xl border z-50 ${
                        theme === 'sepia'
                          ? 'bg-sepia-50 border-sepia-200'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <button
                        onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                        className={`w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors ${
                          theme === 'light' 
                            ? 'bg-primary-50 text-primary-600' 
                            : theme === 'sepia'
                              ? 'hover:bg-sepia-100 text-sepia-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                        className={`w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors ${
                          theme === 'dark' 
                            ? 'bg-primary-50 text-primary-600' 
                            : theme === 'sepia'
                              ? 'hover:bg-sepia-100 text-sepia-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => { setTheme('sepia'); setShowThemeMenu(false); }}
                        className={`w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors ${
                          theme === 'sepia' 
                            ? 'bg-sepia-200 text-sepia-800' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Palette className="w-4 h-4" />
                        <span>Sepia</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              {isAuthenticated && (
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2 rounded-lg transition-colors ${
                      theme === 'sepia'
                        ? 'text-sepia-700 hover:bg-sepia-100'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{unreadCount}</span>
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-80 rounded-lg shadow-xl border z-50 ${
                          theme === 'sepia'
                            ? 'bg-sepia-50 border-sepia-200'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className={`p-4 border-b ${
                          theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
                        }`}>
                          <h3 className={`font-semibold ${
                            theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                          }`}>
                            Notifications
                          </h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                              <div
                                key={notification.id}
                                className={`p-4 border-b last:border-b-0 transition-colors ${
                                  theme === 'sepia'
                                    ? 'border-sepia-100 hover:bg-sepia-100'
                                    : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                } ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`p-2 rounded-full ${
                                    notification.type === 'chapter' ? 'bg-blue-100 text-blue-600' :
                                    notification.type === 'comment' ? 'bg-green-100 text-green-600' :
                                    'bg-yellow-100 text-yellow-600'
                                  }`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-sm ${
                                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                                    }`}>
                                      {notification.title}
                                    </p>
                                    <p className={`text-sm mt-1 ${
                                      theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                                    }`}>
                                      {notification.message}
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                      theme === 'sepia' ? 'text-sepia-500' : 'text-gray-500 dark:text-gray-500'
                                    }`}>
                                      {notification.time}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className={`p-4 border-t ${
                          theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
                        }`}>
                          <button className={`w-full text-center text-sm font-medium transition-colors ${
                            theme === 'sepia'
                              ? 'text-sepia-700 hover:text-sepia-800'
                              : 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
                          }`}>
                            Mark all as read
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Author Dashboard */}
              {isAuthenticated && user?.isAuthor && (
                <Link 
                  to="/author" 
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'sepia'
                      ? 'text-sepia-700 hover:bg-sepia-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <PenTool className="w-5 h-5" />
                </Link>
              )}

              {/* User Profile */}
              {isAuthenticated ? (
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="hidden sm:block text-left">
                      <div className={`text-sm font-medium ${
                        theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                      }`}>
                        {user?.name}
                      </div>
                      <div className={`text-xs ${
                        theme === 'sepia' ? 'text-sepia-600' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        Level {user?.level}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border z-50 ${
                          theme === 'sepia'
                            ? 'bg-sepia-50 border-sepia-200'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className={`p-4 border-b ${
                          theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
                        }`}>
                          <div className={`font-medium ${
                            theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                          }`}>
                            {user?.name}
                          </div>
                          <div className={`text-sm ${
                            theme === 'sepia' ? 'text-sepia-600' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {user?.email}
                          </div>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setShowProfileMenu(false)}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                              theme === 'sepia'
                                ? 'text-sepia-700 hover:bg-sepia-100'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            to="/library"
                            onClick={() => setShowProfileMenu(false)}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                              theme === 'sepia'
                                ? 'text-sepia-700 hover:bg-sepia-100'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Library className="w-4 h-4" />
                            <span>My Library</span>
                          </Link>
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              // Add settings functionality
                            }}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm w-full text-left transition-colors ${
                              theme === 'sepia'
                                ? 'text-sepia-700 hover:bg-sepia-100'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </button>
                          <div className={`border-t my-2 ${
                            theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
                          }`}></div>
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              logout();
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  theme === 'sepia'
                    ? 'text-sepia-700 hover:bg-sepia-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`absolute right-0 top-0 h-full w-80 shadow-xl ${
                theme === 'sepia'
                  ? 'bg-sepia-50'
                  : 'bg-white dark:bg-gray-900'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className={`text-xl font-bold ${
                    theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                  }`}>
                    Menu
                  </h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'sepia'
                        ? 'text-sepia-700 hover:bg-sepia-100'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? theme === 'sepia'
                              ? 'bg-sepia-200 text-sepia-800'
                              : 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                            : theme === 'sepia'
                              ? 'text-sepia-700 hover:bg-sepia-100'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;