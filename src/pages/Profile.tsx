import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Trophy, 
  Calendar, 
  Edit,
  Settings,
  Star,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NovelCard from '../components/common/NovelCard';
import { userLibrary } from '../data/dummyData';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'reading', label: 'Reading Activity', icon: BookOpen },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Novels Read', value: '156', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Chapters Read', value: '2,340', icon: BookOpen, color: 'text-green-600' },
    { label: 'Reviews Written', value: '89', icon: Star, color: 'text-yellow-600' },
    { label: 'Comments Posted', value: '445', icon: MessageSquare, color: 'text-purple-600' },
  ];

  const achievements = [
    { id: 1, name: 'Early Reader', description: 'Read 10 novels before they became popular', icon: '🌟', earned: true },
    { id: 2, name: 'Novel Reviewer', description: 'Write 50 helpful reviews', icon: '📝', earned: true },
    { id: 3, name: 'Community Helper', description: 'Help 100 new readers find great novels', icon: '🤝', earned: true },
    { id: 4, name: 'Speed Reader', description: 'Read 100 chapters in a week', icon: '⚡', earned: false },
    { id: 5, name: 'Genre Explorer', description: 'Read novels from 10 different genres', icon: '🗺️', earned: false },
    { id: 6, name: 'Loyal Fan', description: 'Follow an author for 1 year', icon: '💖', earned: false },
  ];

  const readingGoals = [
    { name: 'Monthly Reading Goal', current: 8, target: 12, unit: 'novels' },
    { name: 'Review Goal', current: 15, target: 20, unit: 'reviews' },
    { name: 'Reading Streak', current: 23, target: 30, unit: 'days' },
  ];

  const recentReviews = [
    {
      id: 1,
      novelTitle: 'The Chronicles of Mystic Realms',
      rating: 5,
      review: 'Absolutely captivating! The world-building is incredible and the characters feel so real.',
      date: '2 days ago'
    },
    {
      id: 2,
      novelTitle: 'Digital Hearts',
      rating: 4,
      review: 'A heartwarming story about love in the digital age. Really enjoyed the character development.',
      date: '1 week ago'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please sign in to view your profile</h2>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-primary-600">{user.level}</span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-xl opacity-90 mb-4">Level {user.level} Reader</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {user.badges.map(badge => (
                  <span key={badge} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.xp.toLocaleString()}</div>
                  <div className="text-sm opacity-75">XP Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm opacity-75">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm opacity-75">Novels Read</div>
                </div>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl transition-colors">
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Level Progress</h3>
            <span className="text-gray-600 dark:text-gray-400">Level {user.level} → {user.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-4 rounded-full transition-all duration-500"
              style={{ width: '68%' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{user.xp.toLocaleString()} XP</span>
            <span>3,600 XP to next level</span>
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
                        className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
                      >
                        <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                        <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Reading Goals */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reading Goals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {readingGoals.map((goal, index) => (
                      <motion.div
                        key={goal.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{goal.name}</h4>
                          <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <span>{goal.current} {goal.unit}</span>
                            <span>{goal.target} {goal.unit}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(goal.current / goal.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {goal.target - goal.current} more to reach your goal!
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Currently Reading */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Currently Reading</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userLibrary.readingNow.slice(0, 3).map((novel, index) => (
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
              </div>
            )}

            {activeTab === 'reading' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reading Activity</h2>
                
                {/* Reading Calendar placeholder */}
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Reading Calendar</h3>
                  <p className="text-gray-600 dark:text-gray-400">Track your daily reading progress and maintain your streak</p>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Finished reading', item: 'Chapter 156 of Chronicles of Mystic Realms', time: '2 hours ago' },
                      { action: 'Added to library', item: 'Digital Hearts', time: '1 day ago' },
                      { action: 'Left a review for', item: 'Shadow of the Ancient Empire', time: '3 days ago' },
                      { action: 'Started reading', item: 'Neon Shadows', time: '1 week ago' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white">
                            <span className="font-medium">{activity.action}</span> {activity.item}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h2>
                  <span className="text-gray-600 dark:text-gray-400">{recentReviews.length} reviews</span>
                </div>
                
                <div className="space-y-6">
                  {recentReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{review.novelTitle}</h3>
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
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{review.review}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Posted {review.date}</span>
                        <button className="text-primary-600 dark:text-primary-400 hover:underline">Edit</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700'
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className={`font-bold text-lg mb-2 ${
                          achievement.earned ? 'text-yellow-800 dark:text-yellow-200' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <div className="flex items-center justify-center space-x-1 text-yellow-600 dark:text-yellow-400">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">Earned</span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">Not earned yet</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                        <textarea
                          rows="3"
                          placeholder="Tell us about yourself..."
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Receive updates about new chapters and comments</div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Reading Reminders</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Get reminded to maintain your reading streak</div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Public Profile</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Allow others to see your reading activity</div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                      Save Changes
                    </button>
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

export default Profile;