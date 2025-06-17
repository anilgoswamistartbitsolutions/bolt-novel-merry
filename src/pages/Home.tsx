import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp, Star, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import { featuredNovels, trendingNovels } from '../data/dummyData';

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % featuredNovels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Novels Available', value: '50,000+' },
    { icon: Users, label: 'Active Readers', value: '2.5M+' },
    { icon: Star, label: 'Chapters Read', value: '100M+' },
    { icon: Award, label: 'Featured Authors', value: '5,000+' },
  ];

  const genres = [
    { name: 'Fantasy', color: 'from-purple-500 to-pink-500', novels: 12450 },
    { name: 'Romance', color: 'from-red-500 to-pink-500', novels: 8900 },
    { name: 'Sci-Fi', color: 'from-blue-500 to-cyan-500', novels: 6750 },
    { name: 'Mystery', color: 'from-gray-700 to-gray-900', novels: 4320 },
    { name: 'Adventure', color: 'from-green-500 to-teal-500', novels: 7890 },
    { name: 'Historical', color: 'from-amber-600 to-orange-600', novels: 3450 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {featuredNovels.map((novel, index) => (
            <motion.div
              key={novel.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === currentBanner ? 1 : 0,
                scale: index === currentBanner ? 1 : 1.1
              }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img 
                src={novel.cover} 
                alt={novel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.div
                key={currentBanner}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Discover Your Next
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-primary-400">
                    Great Adventure
                  </span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Dive into millions of captivating stories from talented authors worldwide. 
                  Your next favorite novel is just a click away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/explore" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center group">
                    Start Exploring
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to={`/novel/${featuredNovels[currentBanner].id}`} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 flex items-center justify-center">
                    Read Featured Novel
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredNovels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Novels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Novels</h2>
              <p className="text-gray-600 dark:text-gray-400">Hand-picked stories that our community loves</p>
            </div>
            <Link to="/explore" className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group">
              View All
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNovels.map((novel, index) => (
              <motion.div
                key={novel.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <NovelCard novel={novel} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
                <p className="text-gray-600 dark:text-gray-400">The hottest novels everyone's talking about</p>
              </div>
            </div>
            <Link to="/rankings" className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group">
              See Rankings
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingNovels.map((novel, index) => (
              <motion.div
                key={novel.id}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <NovelCard novel={novel} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore by Genre</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Find your perfect story in any genre you love</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${genre.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <h3 className="text-2xl font-bold mb-2">{genre.name}</h3>
                  <p className="text-white/80">{genre.novels.toLocaleString()} novels</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of readers and discover your next favorite novel. Create your free account and start reading today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105">
                Create Free Account
              </button>
              <Link to="/explore" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                Browse Without Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;