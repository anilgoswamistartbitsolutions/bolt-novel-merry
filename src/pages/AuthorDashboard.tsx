import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageSquare, 
  Calendar,
  Plus,
  Edit,
  BarChart3,
  Settings,
  Upload
} from 'lucide-react';

const AuthorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'novels', label: 'My Novels', icon: BookOpen },
    { id: 'editor', label: 'Write', icon: PenTool },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Views', value: '1.2M', change: '+12%', icon: Eye, color: 'text-blue-600' },
    { label: 'Followers', value: '15.4K', change: '+8%', icon: Users, color: 'text-green-600' },
    { label: 'Total Likes', value: '89.2K', change: '+15%', icon: Heart, color: 'text-red-600' },
    { label: 'Comments', value: '23.1K', change: '+22%', icon: MessageSquare, color: 'text-purple-600' },
  ];

  const novels = [
    {
      id: 1,
      title: 'The Chronicles of Mystic Realms',
      status: 'ongoing',
      chapters: 156,
      views: 1250000,
      rating: 4.8,
      lastUpdated: '2024-01-15',
      cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      title: 'Shadows of the Ancient Empire',
      status: 'ongoing',
      chapters: 78,
      views: 567000,
      rating: 4.7,
      lastUpdated: '2024-01-12',
      cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const recentActivity = [
    { type: 'chapter', message: 'New chapter published: "The Awakening"', time: '2 hours ago' },
    { type: 'comment', message: 'New comment on Chapter 155', time: '4 hours ago' },
    { type: 'follower', message: '25 new followers', time: '1 day ago' },
    { type: 'milestone', message: 'Reached 1M total views!', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Author Dashboard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Manage your novels and track your success</p>
          </div>
          <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            <Plus className="w-5 h-5" />
            <span>New Novel</span>
          </button>
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
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <Icon className={`w-8 h-8 ${stat.color}`} />
                          <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                        <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'chapter' ? 'bg-blue-100 text-blue-600' :
                            activity.type === 'comment' ? 'bg-purple-100 text-purple-600' :
                            activity.type === 'follower' ? 'bg-green-100 text-green-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {activity.type === 'chapter' && <BookOpen className="w-5 h-5" />}
                            {activity.type === 'comment' && <MessageSquare className="w-5 h-5" />}
                            {activity.type === 'follower' && <Users className="w-5 h-5" />}
                            {activity.type === 'milestone' && <TrendingUp className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 dark:text-white font-medium">{activity.message}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-6 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors text-center">
                        <PenTool className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">Write Chapter</div>
                      </button>
                      <button className="p-6 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">Upload Cover</div>
                      </button>
                      <button className="p-6 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors text-center">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">View Analytics</div>
                      </button>
                      <button className="p-6 bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors text-center">
                        <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">Reply Comments</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'novels' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Novels</h2>
                  <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>New Novel</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {novels.map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
                    >
                      <div className="flex items-center space-x-6">
                        <img 
                          src={novel.cover} 
                          alt={novel.title}
                          className="w-20 h-28 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{novel.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              novel.status === 'ongoing' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {novel.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{novel.chapters}</div>
                              <div>Chapters</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{novel.views.toLocaleString()}</div>
                              <div>Views</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{novel.rating}</div>
                              <div>Rating</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{novel.lastUpdated}</div>
                              <div>Last Updated</div>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                              <BarChart3 className="w-4 h-4" />
                              <span>Analytics</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                              <Calendar className="w-4 h-4" />
                              <span>Schedule</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chapter Editor</h2>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                      Save Draft
                    </button>
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                      Publish
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Chapter Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter chapter title..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content
                    </label>
                    <textarea
                      rows="20"
                      placeholder="Start writing your chapter..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 font-reading text-lg leading-relaxed resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div>Word count: 0</div>
                    <div>Auto-saved 2 minutes ago</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Views Over Time</h3>
                    <div className="h-64 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reader Demographics</h3>
                    <div className="h-64 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Author Settings</h2>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Author Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Elena Starweaver"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows="4"
                        defaultValue="Fantasy author passionate about creating immersive worlds and compelling characters."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;