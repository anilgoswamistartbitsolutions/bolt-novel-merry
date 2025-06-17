import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Clock, List, Plus, Settings, Search, Filter } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import { userLibrary } from '../data/dummyData';

const Library = () => {
  const [activeTab, setActiveTab] = useState('reading');
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const tabs = [
    { id: 'reading', label: 'Reading Now', icon: BookOpen, count: userLibrary.readingNow.length },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: userLibrary.favorites.length },
    { id: 'bookmarks', label: 'Bookmarks', icon: Clock, count: userLibrary.bookmarks.length },
    { id: 'lists', label: 'Custom Lists', icon: List, count: userLibrary.customLists.length },
  ];

  const createNewList = () => {
    if (newListName.trim()) {
      // In a real app, this would create a new list
      console.log('Creating new list:', newListName);
      setNewListName('');
      setShowCreateList(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Library</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Your personal collection of novels and reading progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
            <div className="text-3xl font-bold mb-2">156</div>
            <div className="opacity-90">Chapters Read</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
            <div className="text-3xl font-bold mb-2">23</div>
            <div className="opacity-90">Novels Started</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="opacity-90">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
            <div className="text-3xl font-bold mb-2">45h</div>
            <div className="opacity-90">Reading Time</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-sm">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'reading' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Continue Reading</h2>
                  <span className="text-gray-600 dark:text-gray-400">{userLibrary.readingNow.length} novels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userLibrary.readingNow.map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NovelCard 
                        novel={novel} 
                        showProgress={true} 
                        progress={Math.floor(Math.random() * 80) + 10} 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Favorite Novels</h2>
                  <span className="text-gray-600 dark:text-gray-400">{userLibrary.favorites.length} novels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userLibrary.favorites.map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NovelCard novel={novel} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bookmarked Chapters</h2>
                  <span className="text-gray-600 dark:text-gray-400">{userLibrary.bookmarks.length} bookmarks</span>
                </div>
                <div className="space-y-4">
                  {userLibrary.bookmarks.map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                            {chapter.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            Chapter {chapter.chapterNumber} • Bookmarked on {new Date(chapter.publishedAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            "The morning mist clung to the ancient stones..."
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                            Continue Reading
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'lists' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Reading Lists</h2>
                  <button
                    onClick={() => setShowCreateList(true)}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create List</span>
                  </button>
                </div>

                {showCreateList && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-6"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Create New List</h3>
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="List name..."
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                      />
                      <button
                        onClick={createNewList}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => setShowCreateList(false)}
                        className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userLibrary.customLists.map((list, index) => (
                    <motion.div
                      key={list.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">{list.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            list.isPublic 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                          }`}>
                            {list.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {list.novels.length} novel{list.novels.length !== 1 ? 's' : ''}
                      </p>
                      <div className="flex -space-x-2">
                        {list.novels.slice(0, 4).map((novel, i) => (
                          <img
                            key={novel.id}
                            src={novel.cover}
                            alt={novel.title}
                            className="w-10 h-12 object-cover rounded border-2 border-white dark:border-gray-700"
                          />
                        ))}
                        {list.novels.length > 4 && (
                          <div className="w-10 h-12 bg-gray-200 dark:bg-gray-600 rounded border-2 border-white dark:border-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                              +{list.novels.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;