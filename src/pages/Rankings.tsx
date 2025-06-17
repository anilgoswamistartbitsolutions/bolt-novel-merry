import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Star, Calendar, Medal, Crown, Award } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import { featuredNovels, trendingNovels } from '../data/dummyData';

const Rankings = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [timeFrame, setTimeFrame] = useState('week');

  const allNovels = [...featuredNovels, ...trendingNovels];
  
  const tabs = [
    { id: 'popular', label: 'Most Popular', icon: TrendingUp },
    { id: 'rated', label: 'Top Rated', icon: Star },
    { id: 'new', label: 'New Releases', icon: Calendar },
    { id: 'completed', label: 'Completed', icon: Award },
  ];

  const timeFrames = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
    { id: 'alltime', label: 'All Time' },
  ];

  const getRankingData = (tab: string) => {
    switch (tab) {
      case 'popular':
        return [...allNovels].sort((a, b) => b.totalReads - a.totalReads);
      case 'rated':
        return [...allNovels].sort((a, b) => b.rating - a.rating);
      case 'new':
        return [...allNovels].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      case 'completed':
        return allNovels.filter(novel => novel.status === 'completed');
      default:
        return allNovels;
    }
  };

  const rankingData = getRankingData(activeTab);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return { icon: Crown, color: 'text-yellow-500' };
    if (rank === 2) return { icon: Medal, color: 'text-gray-400' };
    if (rank === 3) return { icon: Medal, color: 'text-amber-600' };
    return { icon: Trophy, color: 'text-gray-500' };
  };

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
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Novel Rankings</h1>
          </motion.div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Discover the most popular and highest-rated novels</p>
        </div>

        {/* Tabs and Time Frame */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Tabs */}
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

            {/* Time Frame */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              {timeFrames.map(frame => (
                <button
                  key={frame.id}
                  onClick={() => setTimeFrame(frame.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeFrame === frame.id
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {frame.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Top 3 Champions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rankingData.slice(0, 3).map((novel, index) => {
              const rank = index + 1;
              const { icon: RankIcon, color } = getRankIcon(rank);
              return (
                <motion.div
                  key={novel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${rank === 1 ? 'md:order-2 md:-mt-8' : rank === 2 ? 'md:order-1' : 'md:order-3'}`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative">
                      <img 
                        src={novel.cover} 
                        alt={novel.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center ${
                        rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        'bg-gradient-to-br from-amber-500 to-amber-700'
                      } shadow-lg`}>
                        <RankIcon className={`w-6 h-6 text-white`} />
                      </div>
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-white text-sm font-bold">#{rank}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">{novel.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">by {novel.author}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{novel.rating}</span>
                        </div>
                        <div>{novel.totalReads.toLocaleString()} reads</div>
                      </div>
                    </div>
                  </div>
                  {rank === 1 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        👑 Champion
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Full Rankings List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Rankings</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {timeFrames.find(f => f.id === timeFrame)?.label} - {tabs.find(t => t.id === activeTab)?.label}
            </p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {rankingData.map((novel, index) => {
              const rank = index + 1;
              const { icon: RankIcon, color } = getRankIcon(rank);
              return (
                <motion.div
                  key={novel.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-6">
                    {/* Rank */}
                    <div className="flex items-center space-x-3 w-20">
                      <RankIcon className={`w-6 h-6 ${color}`} />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">#{rank}</span>
                    </div>

                    {/* Novel Info */}
                    <div className="flex-1 flex items-center space-x-4">
                      <img 
                        src={novel.cover} 
                        alt={novel.title}
                        className="w-16 h-20 object-cover rounded-lg shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">{novel.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">by {novel.author}</p>
                        <div className="flex flex-wrap gap-2">
                          {novel.genre.slice(0, 2).map(genre => (
                            <span key={genre} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{novel.rating}</div>
                        <div>Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{novel.totalReads.toLocaleString()}</div>
                        <div>Reads</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">{novel.totalChapters}</div>
                        <div>Chapters</div>
                      </div>
                    </div>

                    {/* Change Indicator */}
                    <div className="flex items-center space-x-2">
                      {rank <= 3 ? (
                        <div className="flex items-center text-green-500">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium ml-1">+{Math.floor(Math.random() * 5) + 1}</span>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <span className="text-sm">New</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            Load More Rankings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rankings;