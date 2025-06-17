import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Bookmark, 
  MessageSquare, 
  Heart,
  Sun, 
  Moon, 
  Palette,
  Type,
  AlignLeft,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { sampleChapters, featuredNovels } from '../data/dummyData';

const ChapterReader = () => {
  const { novelId, chapterId } = useParams();
  const { theme, setTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [fontFamily, setFontFamily] = useState('reading');
  const [showComments, setShowComments] = useState(false);
  
  const novel = featuredNovels.find(n => n.id === novelId) || featuredNovels[0];
  const chapter = sampleChapters.find(c => c.novelId === novelId) || sampleChapters[0];
  const chapterNum = parseInt(chapterId || '1');

  const readerSettings = {
    light: { bg: 'bg-white', text: 'text-gray-900' },
    dark: { bg: 'bg-gray-900', text: 'text-gray-100' },
    sepia: { bg: 'bg-amber-50', text: 'text-amber-900' }
  };

  const currentTheme = readerSettings[theme];

  const comments = [
    {
      id: 1,
      user: 'MagicFan92',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50',
      content: 'The magical pendant scene gave me chills! Elena really knows how to build tension.',
      timestamp: '2 hours ago',
      likes: 12,
      paragraph: 3
    },
    {
      id: 2,
      user: 'BookwormSarah',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
      content: 'I love the friendship between Aria and Luna. Their dynamic is so well written!',
      timestamp: '4 hours ago',
      likes: 8,
      paragraph: 5
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${currentTheme.bg} border-b border-gray-200 dark:border-gray-700 shadow-sm`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to={`/novel/${novelId}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-semibold text-lg">{chapter.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{novel.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowComments(!showComments)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{comments.length}</span>
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-80"
        >
          <h3 className="font-bold text-lg mb-4">Reading Settings</h3>
          
          <div className="space-y-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-colors ${
                    theme === 'light' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-sm">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-colors ${
                    theme === 'dark' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-sm">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-colors ${
                    theme === 'sepia' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span className="text-sm">Sepia</span>
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="14"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-medium mb-2">Line Height: {lineHeight}</label>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium mb-2">Font Family</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="reading">Serif (Georgia)</option>
                <option value="display">Sans-serif (Inter)</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex">
        {/* Chapter Content */}
        <main className={`flex-1 ${showComments ? 'mr-96' : ''} transition-all duration-300`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <article 
              className={`prose prose-lg max-w-none ${currentTheme.text}`}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                fontFamily: fontFamily === 'reading' ? 'Georgia, serif' : 
                           fontFamily === 'display' ? 'Inter, sans-serif' : 
                           'Monaco, monospace'
              }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Chapter {chapter.chapterNumber}</span>
                  <span>•</span>
                  <span>Published on {new Date(chapter.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>2,450 words</span>
                  <span>•</span>
                  <span>~8 min read</span>
                </div>
              </div>

              <div className="chapter-content">
                {chapter.content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-6 relative group"
                  >
                    {paragraph}
                    <button className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary-500">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </motion.p>
                ))}
              </div>

              {/* Chapter End Actions */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Enjoyed this chapter?</h3>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>345</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Support the author by leaving a comment or sharing with friends!
                </p>
              </div>
            </article>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                to={chapterNum > 1 ? `/read/${novelId}/${chapterNum - 1}` : '#'}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors ${
                  chapterNum > 1
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Previous</div>
                  <div className="font-medium">Chapter {chapterNum - 1}</div>
                </div>
              </Link>

              <Link to={`/novel/${novelId}`} className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors">
                <BookOpen className="w-5 h-5 inline mr-2" />
                Novel Details
              </Link>

              <Link
                to={`/read/${novelId}/${chapterNum + 1}`}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Next</div>
                  <div className="font-medium">Chapter {chapterNum + 1}</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>

        {/* Comments Sidebar */}
        {showComments && (
          <motion.aside
            initial={{ x: 384 }}
            animate={{ x: 0 }}
            className="fixed right-0 top-16 h-full w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
                <button 
                  onClick={() => setShowComments(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={comment.avatar} 
                        alt={comment.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-sm">{comment.user}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-primary-500 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700"
                  rows="3"
                />
                <button className="mt-2 w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-xl font-medium transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
};

export default ChapterReader;