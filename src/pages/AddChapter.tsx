import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Upload, Calendar, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const AddChapter = () => {
  const { theme } = useTheme();
  const [chapterData, setChapterData] = useState({
    title: '',
    content: '',
    authorNote: '',
    scheduledDate: '',
    scheduledTime: '',
    isScheduled: false
  });
  const [wordCount, setWordCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChapterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'content') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Chapter data:', chapterData);
    // Handle form submission
  };

  const estimatedReadTime = Math.ceil(wordCount / 200); // Average reading speed

  return (
    <div className={`min-h-screen py-8 ${
      theme === 'sepia' ? 'bg-sepia-50' : 'bg-gray-50 dark:bg-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/author"
              className={`p-2 rounded-lg transition-colors ${
                theme === 'sepia'
                  ? 'text-sepia-700 hover:bg-sepia-100'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                Add New Chapter
              </h1>
              <p className={`text-xl ${
                theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
              }`}>
                Continue your story
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                {wordCount.toLocaleString()}
              </div>
              <div className={`text-sm ${
                theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
              }`}>
                Words
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                {estimatedReadTime}
              </div>
              <div className={`text-sm ${
                theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
              }`}>
                Min Read
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Chapter Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl shadow-lg p-6 ${
                  theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <label className={`block text-sm font-medium mb-3 ${
                  theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Chapter Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={chapterData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-xl font-semibold border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    theme === 'sepia'
                      ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter chapter title..."
                />
              </motion.div>

              {/* Content Editor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`rounded-2xl shadow-lg overflow-hidden ${
                  theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className={`p-4 border-b flex items-center justify-between ${
                  theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <h2 className={`text-lg font-semibold ${
                    theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                  }`}>
                    Chapter Content
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                        showPreview 
                          ? 'bg-primary-600 text-white' 
                          : theme === 'sepia'
                            ? 'bg-sepia-200 text-sepia-700 hover:bg-sepia-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>{showPreview ? 'Edit' : 'Preview'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {showPreview ? (
                    <div className={`prose max-w-none ${
                      theme === 'sepia' ? 'prose-sepia' : 'prose-gray dark:prose-invert'
                    }`}>
                      <h1>{chapterData.title || 'Chapter Title'}</h1>
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {chapterData.content || 'Your chapter content will appear here...'}
                      </div>
                    </div>
                  ) : (
                    <textarea
                      name="content"
                      value={chapterData.content}
                      onChange={handleInputChange}
                      rows="20"
                      className={`w-full px-0 py-0 border-0 focus:ring-0 text-lg leading-relaxed resize-none ${
                        theme === 'sepia'
                          ? 'bg-sepia-100 text-sepia-800 placeholder-sepia-500'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500'
                      }`}
                      placeholder="Start writing your chapter..."
                      style={{ fontFamily: 'Georgia, serif' }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Author Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl shadow-lg p-6 ${
                  theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <label className={`block text-sm font-medium mb-3 ${
                  theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Author's Note (Optional)
                </label>
                <textarea
                  name="authorNote"
                  value={chapterData.authorNote}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none ${
                    theme === 'sepia'
                      ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Add a note for your readers..."
                />
              </motion.div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Publishing Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-2xl shadow-lg p-6 ${
                theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                Publishing Options
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="scheduled"
                    name="isScheduled"
                    checked={chapterData.isScheduled}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="scheduled" className={`text-sm font-medium ${
                    theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Schedule for later
                  </label>
                </div>

                {chapterData.isScheduled && (
                  <div className="space-y-3 pl-7">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        Date
                      </label>
                      <input
                        type="date"
                        name="scheduledDate"
                        value={chapterData.scheduledDate}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          theme === 'sepia'
                            ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${
                        theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        Time
                      </label>
                      <input
                        type="time"
                        name="scheduledTime"
                        value={chapterData.scheduledTime}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          theme === 'sepia'
                            ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Chapter Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-2xl shadow-lg p-6 ${
                theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                Chapter Statistics
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Word Count
                  </span>
                  <span className={`font-semibold ${
                    theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                  }`}>
                    {wordCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Est. Read Time
                  </span>
                  <span className={`font-semibold ${
                    theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                  }`}>
                    {estimatedReadTime} min
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Characters
                  </span>
                  <span className={`font-semibold ${
                    theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                  }`}>
                    {chapterData.content.length.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Save Draft</span>
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>
                  {chapterData.isScheduled ? 'Schedule Chapter' : 'Publish Chapter'}
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;