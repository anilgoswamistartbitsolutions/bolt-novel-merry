import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import NovelDetail from './pages/NovelDetail';
import ChapterReader from './pages/ChapterReader';
import Rankings from './pages/Rankings';
import Library from './pages/Library';
import AuthorDashboard from './pages/AuthorDashboard';
import Community from './pages/Community';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AddNovel from './pages/AddNovel';
import AddChapter from './pages/AddChapter';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const { theme, isSepia } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isSepia 
        ? 'bg-sepia-50' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900'
    }`}>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/novel/:id" element={<NovelDetail />} />
          <Route path="/read/:novelId/:chapterId" element={<ChapterReader />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/library" element={<Library />} />
          <Route path="/author" element={<AuthorDashboard />} />
          <Route path="/author/add-novel" element={<AddNovel />} />
          <Route path="/author/add-chapter" element={<AddChapter />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;