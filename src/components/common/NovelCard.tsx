import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Star, Clock, User, Eye, TrendingUp, Award } from 'lucide-react';
import { Novel } from '../../data/dummyData';
import { useTheme } from '../../contexts/ThemeContext';

interface NovelCardProps {
  novel: Novel;
  showProgress?: boolean;
  progress?: number;
  variant?: 'default' | 'compact' | 'featured';
}

const NovelCard: React.FC<NovelCardProps> = ({ 
  novel, 
  showProgress = false, 
  progress = 0,
  variant = 'default'
}) => {
  const { theme } = useTheme();

  const cardClasses = `
    group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]
    ${theme === 'sepia' 
      ? 'bg-sepia-50 hover:bg-sepia-100' 
      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
    }
  `;

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className={cardClasses}
      >
        <div className="flex p-4 space-x-4">
          <div className="relative flex-shrink-0">
            <img 
              src={novel.cover} 
              alt={novel.title}
              className="w-16 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            <div className="absolute -top-2 -right-2">
              <button className="w-6 h-6 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md">
                <Heart className={`w-3 h-3 ${novel.isBookmarked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <Link to={`/novel/${novel.id}`}>
              <h3 className={`font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                {novel.title}
              </h3>
            </Link>
            
            <div className="flex items-center space-x-1 mb-2">
              <User className="w-3 h-3 text-gray-400" />
              <span className={`text-sm ${
                theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {novel.author}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className={`text-sm font-medium ${
                  theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {novel.rating}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                novel.status === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                novel.status === 'ongoing' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {novel.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className={`${cardClasses} overflow-hidden`}
      >
        <div className="relative h-64">
          <img 
            src={novel.cover} 
            alt={novel.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Floating Elements */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow-lg">
              FEATURED
            </span>
            {novel.totalReads > 1000000 && (
              <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>BESTSELLER</span>
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Heart className={`w-5 h-5 ${novel.isBookmarked ? 'text-red-500 fill-current' : 'text-white'}`} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Link to={`/novel/${novel.id}`}>
              <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-primary-300 transition-colors">
                {novel.title}
              </h3>
            </Link>
            <div className="flex items-center space-x-4 text-white/90 text-sm">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{novel.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{novel.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{(novel.totalReads / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cardClasses}
    >
      <div className="relative">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img 
            src={novel.cover} 
            alt={novel.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="absolute top-3 right-3 space-y-2">
          <button className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg backdrop-blur-sm">
            <Heart className={`w-4 h-4 ${novel.isBookmarked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'}`} />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${
            novel.status === 'completed' 
              ? 'bg-green-500/90 text-white' :
            novel.status === 'ongoing' 
              ? 'bg-blue-500/90 text-white' :
            'bg-yellow-500/90 text-white'
          }`}>
            {novel.status.toUpperCase()}
          </span>
        </div>

        {novel.totalReads > 500000 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 px-2 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              <TrendingUp className="w-3 h-3" />
              <span>HOT</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className={`text-sm font-bold ${
              theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {novel.rating}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {novel.genre.slice(0, 2).map((genre) => (
              <span key={genre} className={`px-2 py-1 text-xs rounded-full font-medium ${
                theme === 'sepia'
                  ? 'bg-sepia-200 text-sepia-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {genre}
              </span>
            ))}
          </div>
        </div>

        <Link to={`/novel/${novel.id}`}>
          <h3 className={`font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight ${
            theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
          }`}>
            {novel.title}
          </h3>
        </Link>

        <div className="flex items-center space-x-1 mb-3">
          <User className="w-4 h-4 text-gray-400" />
          <span className={`text-sm font-medium ${
            theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {novel.author}
          </span>
        </div>

        <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
          theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {novel.description}
        </p>

        {showProgress && (
          <div className="mb-4">
            <div className={`flex items-center justify-between text-sm mb-2 ${
              theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
            }`}>
              <span className="font-medium">Reading Progress</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${
              theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              />
            </div>
          </div>
        )}

        <div className={`flex items-center justify-between text-sm mb-5 ${
          theme === 'sepia' ? 'text-sepia-500' : 'text-gray-500 dark:text-gray-400'
        }`}>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">{novel.totalChapters} chapters</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{novel.lastUpdated}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link 
            to={`/read/${novel.id}/1`}
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-center py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {novel.isInLibrary ? 'Continue Reading' : 'Start Reading'}
          </Link>
          <button className={`px-4 py-3 border-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
            theme === 'sepia'
              ? 'border-sepia-300 text-sepia-700 hover:bg-sepia-100'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}>
            {novel.isInLibrary ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NovelCard;