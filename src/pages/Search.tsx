import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, BookOpen, User, MessageSquare, TrendingUp } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import { featuredNovels, trendingNovels, communityPosts } from '../data/dummyData';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', label: 'All Results', icon: SearchIcon },
    { id: 'novels', label: 'Novels', icon: BookOpen },
    { id: 'authors', label: 'Authors', icon: User },
    { id: 'posts', label: 'Community Posts', icon: MessageSquare },
  ];

  const allNovels = [...featuredNovels, ...trendingNovels];
  const authors = [
    { id: 1, name: 'Elena Starweaver', novels: 3, followers: 15400, avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 2, name: 'Marcus Chen', novels: 2, followers: 8900, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 3, name: 'Dr. Alexandra Blackwood', novels: 1, followers: 5600, avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ];

  const trendingSearches = [
    'fantasy magic systems',
    'completed romance novels',
    'cyberpunk stories',
    'Elena Starweaver',
    'ancient empire mystery',
    'digital hearts review'
  ];

  const getFilteredResults = () => {
    if (!searchTerm.trim()) return { novels: [], authors: [], posts: [] };

    const term = searchTerm.toLowerCase();
    
    const novels = allNovels.filter(novel => 
      novel.title.toLowerCase().includes(term) ||
      novel.author.toLowerCase().includes(term) ||
      novel.description.toLowerCase().includes(term) ||
      novel.genre.some(g => g.toLowerCase().includes(term)) ||
      novel.tags.some(t => t.toLowerCase().includes(term))
    );

    const filteredAuthors = authors.filter(author =>
      author.name.toLowerCase().includes(term)
    );

    const posts = communityPosts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term) ||
      post.tags.some(t => t.toLowerCase().includes(term))
    );

    return { novels, authors: filteredAuthors, posts };
  };

  const results = getFilteredResults();
  const totalResults = results.novels.length + results.authors.length + results.posts.length;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Search</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Find novels, authors, and community discussions</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for novels, authors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Genre</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700">
                    <option>All Genres</option>
                    <option>Fantasy</option>
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                    <option>Mystery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700">
                    <option>All Status</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Hiatus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700">
                    <option>Relevance</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* No Search Term - Show Trending */}
        {!searchTerm.trim() && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trending Searches</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Discover what others are searching for</p>
              <div className="flex flex-wrap justify-center gap-3">
                {trendingSearches.map((search, index) => (
                  <motion.button
                    key={search}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSearchTerm(search)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm.trim() && (
          <div>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map(filter => {
                const Icon = filter.icon;
                const count = filter.id === 'all' ? totalResults :
                             filter.id === 'novels' ? results.novels.length :
                             filter.id === 'authors' ? results.authors.length :
                             results.posts.length;
                
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === filter.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchTerm}"
              </p>
            </div>

            {/* No Results */}
            {totalResults === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search terms or browse our trending content</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Results Content */}
            {totalResults > 0 && (
              <div className="space-y-8">
                {/* Novels */}
                {(activeFilter === 'all' || activeFilter === 'novels') && results.novels.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Novels ({results.novels.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.novels.map((novel, index) => (
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

                {/* Authors */}
                {(activeFilter === 'all' || activeFilter === 'authors') && results.authors.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Authors ({results.authors.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.authors.map((author, index) => (
                        <motion.div
                          key={author.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <img 
                              src={author.avatar} 
                              alt={author.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{author.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400">{author.novels} novel{author.novels !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {author.followers.toLocaleString()} followers
                            </div>
                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                              Follow
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Posts */}
                {(activeFilter === 'all' || activeFilter === 'posts') && results.posts.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Community Posts ({results.posts.length})
                    </h2>
                    <div className="space-y-4">
                      {results.posts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        >
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{post.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{post.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>by {post.author}</span>
                              <span>{post.timestamp}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{post.likes} likes</span>
                              <span>{post.replies} replies</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;