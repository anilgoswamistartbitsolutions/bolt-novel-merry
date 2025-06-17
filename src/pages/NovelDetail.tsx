import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  BookOpen, 
  User, 
  Calendar, 
  MessageSquare, 
  Share2, 
  Play,
  Plus,
  UserPlus,
  Clock,
  TrendingUp
} from 'lucide-react';
import { featuredNovels, sampleChapters, communityPosts } from '../data/dummyData';

const NovelDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the novel - in a real app, this would come from an API
  const novel = featuredNovels.find(n => n.id === id) || featuredNovels[0];
  const chapters = sampleChapters.filter(c => c.novelId === novel.id);
  const relatedPosts = communityPosts.filter(p => p.tags.includes(novel.title));

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'chapters', label: `Chapters (${novel.totalChapters})` },
    { id: 'reviews', label: 'Reviews (245)' },
    { id: 'discussion', label: 'Discussion' },
    { id: 'characters', label: 'Characters' },
  ];

  const characters = [
    {
      name: 'Aria Moonwhisper',
      role: 'Protagonist',
      description: 'A young mage with mysterious powers',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Luna Starfall',
      role: 'Best Friend',
      description: 'Aria\'s loyal companion and roommate',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const reviews = [
    {
      id: 1,
      user: 'BookLover99',
      rating: 5,
      comment: 'Absolutely captivating! The world-building is incredible and the characters feel so real.',
      date: '2 days ago',
      likes: 23
    },
    {
      id: 2,
      user: 'FantasyFan',
      rating: 4,
      comment: 'Great story with amazing plot twists. Can\'t wait for the next chapter!',
      date: '1 week ago',
      likes: 15
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl overflow-hidden mb-8">
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {novel.genre.map(genre => (
                    <span key={genre} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {genre}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{novel.title}</h1>
                <div className="flex items-center space-x-4 text-white/90 mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-5 h-5" />
                    <span>by {novel.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span>{novel.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-5 h-5" />
                    <span>{novel.totalChapters} chapters</span>
                  </div>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">{novel.description}</p>
              </div>
              <div className="flex justify-center">
                <img 
                  src={novel.cover} 
                  alt={novel.title}
                  className="w-64 h-80 object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link 
            to={`/read/${novel.id}/1`} 
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Start Reading</span>
          </Link>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add to Library</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Heart className="w-5 h-5" />
            <span>Bookmark</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <UserPlus className="w-5 h-5" />
            <span>Follow Author</span>
          </button>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{novel.totalReads.toLocaleString()}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Reads</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">{novel.rating}</div>
            <div className="text-gray-600 dark:text-gray-400">Rating</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">12.5K</div>
            <div className="text-gray-600 dark:text-gray-400">Followers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">8.9K</div>
            <div className="text-gray-600 dark:text-gray-400">Comments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Novel</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{novel.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                        <span className={`font-medium ${
                          novel.status === 'completed' ? 'text-green-600' :
                          novel.status === 'ongoing' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {novel.status.charAt(0).toUpperCase() + novel.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Chapters</span>
                        <span className="font-medium text-gray-900 dark:text-white">{novel.totalChapters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                        <span className="font-medium text-gray-900 dark:text-white">{novel.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {novel.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chapters' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Chapter List</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {novel.lastUpdated}</span>
                  </div>
                </div>
                
                {Array.from({ length: 10 }, (_, i) => (
                  <Link
                    key={i}
                    to={`/read/${novel.id}/${i + 1}`}
                    className="block bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-4 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          Chapter {i + 1}: {i === 0 ? 'The Awakening' : `Chapter ${i + 1} Title`}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Published on January {15 - i}, 2024
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>2.5k words</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Reader Reviews</h3>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Write Review
                  </button>
                </div>
                
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{review.user}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{review.likes}</span>
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Discussion Board</h3>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    New Topic
                  </button>
                </div>
                
                <div className="space-y-4">
                  {relatedPosts.map(post => (
                    <div key={post.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.content}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                          <span>by {post.author}</span>
                          <span>{post.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'characters' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Main Characters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {characters.map(character => (
                    <div key={character.name} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white">{character.name}</h4>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">{character.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{character.description}</p>
                    </div>
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

export default NovelDetail;