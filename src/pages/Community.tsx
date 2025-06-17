import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Users, TrendingUp, Plus, Search, Filter, Pin } from 'lucide-react';
import { communityPosts } from '../data/dummyData';

const Community = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Posts', icon: MessageSquare },
    { id: 'discussions', label: 'Discussions', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Heart },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
  ];

  const allPosts = [
    ...communityPosts,
    {
      id: 'post3',
      title: 'What makes a good fantasy magic system?',
      author: 'WorldBuilder23',
      content: 'I\'ve been thinking about different approaches to magic systems in fantasy novels...',
      likes: 89,
      replies: 34,
      timestamp: '6 hours ago',
      tags: ['Discussion', 'Fantasy', 'Writing'],
      isPinned: true
    },
    {
      id: 'post4',
      title: 'Monthly Reading Challenge - January 2024',
      author: 'CommunityMod',
      content: 'Welcome to our monthly reading challenge! This month we\'re focusing on completed novels...',
      likes: 156,
      replies: 67,
      timestamp: '1 day ago',
      tags: ['Challenge', 'Community'],
      isPinned: true
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Community</h1>
          </motion.div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Connect with fellow readers and authors</p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center">
            <div className="text-3xl font-bold mb-2">2.5M</div>
            <div className="opacity-90">Active Members</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white text-center">
            <div className="text-3xl font-bold mb-2">45K</div>
            <div className="opacity-90">Daily Posts</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center">
            <div className="text-3xl font-bold mb-2">156K</div>
            <div className="opacity-90">Discussions</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white text-center">
            <div className="text-3xl font-bold mb-2">89K</div>
            <div className="opacity-90">Reviews</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {['Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Writing Tips', 'Book Reviews'].map(topic => (
                  <button
                    key={topic}
                    className="w-full text-left px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Community Rules</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div>1. Be respectful to all members</div>
                <div>2. No spoilers without warnings</div>
                <div>3. Stay on topic in discussions</div>
                <div>4. No spam or self-promotion</div>
                <div>5. Use appropriate tags</div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Filter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Post</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Create New Post</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Post title..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700"
                  />
                  <textarea
                    rows="4"
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Add tags (comma separated)"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 mr-4"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowCreatePost(false)}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {allPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {post.isPinned && (
                          <Pin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        )}
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">{post.title}</h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span>by {post.author}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span>{post.replies}</span>
                          </button>
                        </div>
                        <button className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                Load More Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;