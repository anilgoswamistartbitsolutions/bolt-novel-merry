import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Settings,
  BarChart3,
  MessageSquare,
  Flag,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Moderation', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Users', value: '125,430', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Novels', value: '8,945', change: '+8%', icon: BookOpen, color: 'text-green-600' },
    { label: 'Daily Reads', value: '2.3M', change: '+15%', icon: Eye, color: 'text-purple-600' },
    { label: 'Pending Reports', value: '23', change: '-5%', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const recentUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', status: 'active', joinDate: '2024-01-15', novels: 3 },
    { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', status: 'active', joinDate: '2024-01-14', novels: 1 },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'suspended', joinDate: '2024-01-13', novels: 0 },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', status: 'active', joinDate: '2024-01-12', novels: 5 },
  ];

  const pendingContent = [
    { id: 1, title: 'The Dragon\'s Quest', author: 'John Smith', type: 'novel', status: 'pending', reportCount: 2 },
    { id: 2, title: 'Chapter 45: The Final Battle', author: 'Jane Doe', type: 'chapter', status: 'pending', reportCount: 1 },
    { id: 3, title: 'Love in the Stars', author: 'Bob Johnson', type: 'novel', status: 'flagged', reportCount: 5 },
  ];

  const reports = [
    { id: 1, type: 'Inappropriate Content', target: 'Novel: "Dark Secrets"', reporter: 'User123', date: '2024-01-15', status: 'pending' },
    { id: 2, type: 'Spam', target: 'Comment on Chapter 12', reporter: 'Reader456', date: '2024-01-14', status: 'resolved' },
    { id: 3, type: 'Copyright Violation', target: 'Novel: "Copied Story"', reporter: 'Author789', date: '2024-01-13', status: 'investigating' },
  ];

  return (
    <div className={`min-h-screen py-8 ${
      theme === 'sepia' ? 'bg-sepia-50' : 'bg-gray-50 dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold mb-2 flex items-center space-x-3 ${
              theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
            }`}>
              <Shield className="w-10 h-10 text-red-600" />
              <span>Admin Dashboard</span>
            </h1>
            <p className={`text-xl ${
              theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
            }`}>
              Manage and monitor the Novel-Merry platform
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl shadow-lg p-6 ${
                  theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                }`}>
                  {stat.value}
                </div>
                <div className={`${
                  theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className={`rounded-2xl shadow-lg overflow-hidden mb-8 ${
          theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
        }`}>
          <div className={`border-b ${
            theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
          }`}>
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
                        : theme === 'sepia'
                          ? 'text-sepia-600 hover:text-sepia-800'
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${
                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                    }`}>
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {[
                        { action: 'New user registered', user: 'Alex Johnson', time: '5 minutes ago' },
                        { action: 'Novel published', user: 'Sarah Chen', time: '15 minutes ago' },
                        { action: 'Report submitted', user: 'Mike Wilson', time: '1 hour ago' },
                        { action: 'Chapter updated', user: 'Emma Davis', time: '2 hours ago' },
                      ].map((activity, index) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-50 dark:bg-gray-700'
                        }`}>
                          <div className={`font-medium ${
                            theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                          }`}>
                            {activity.action}
                          </div>
                          <div className={`text-sm ${
                            theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            by {activity.user} • {activity.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Health */}
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${
                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                    }`}>
                      System Health
                    </h3>
                    <div className="space-y-4">
                      {[
                        { metric: 'Server Uptime', value: '99.9%', status: 'good' },
                        { metric: 'Database Performance', value: '95%', status: 'good' },
                        { metric: 'API Response Time', value: '120ms', status: 'warning' },
                        { metric: 'Storage Usage', value: '78%', status: 'good' },
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className={`${
                            theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {metric.metric}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${
                              theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                            }`}>
                              {metric.value}
                            </span>
                            <div className={`w-3 h-3 rounded-full ${
                              metric.status === 'good' ? 'bg-green-500' :
                              metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${
                    theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                  }`}>
                    User Management
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          theme === 'sepia'
                            ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      />
                    </div>
                    <button className={`p-2 rounded-lg transition-colors ${
                      theme === 'sepia'
                        ? 'text-sepia-700 hover:bg-sepia-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}>
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${
                        theme === 'sepia' ? 'border-sepia-200' : 'border-gray-200 dark:border-gray-700'
                      }`}>
                        <th className={`text-left py-3 px-4 font-semibold ${
                          theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                        }`}>
                          User
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold ${
                          theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                        }`}>
                          Status
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold ${
                          theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                        }`}>
                          Join Date
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold ${
                          theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                        }`}>
                          Novels
                        </th>
                        <th className={`text-left py-3 px-4 font-semibold ${
                          theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                        }`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user.id} className={`border-b ${
                          theme === 'sepia' ? 'border-sepia-100' : 'border-gray-100 dark:border-gray-700'
                        }`}>
                          <td className="py-4 px-4">
                            <div>
                              <div className={`font-medium ${
                                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                              }`}>
                                {user.name}
                              </div>
                              <div className={`text-sm ${
                                theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className={`py-4 px-4 ${
                            theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {user.joinDate}
                          </td>
                          <td className={`py-4 px-4 ${
                            theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {user.novels}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <Ban className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold ${
                  theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                }`}>
                  Content Moderation
                </h2>

                <div className="space-y-4">
                  {pendingContent.map(content => (
                    <div key={content.id} className={`p-6 rounded-xl border ${
                      content.status === 'flagged' 
                        ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                        : theme === 'sepia'
                          ? 'border-sepia-200 bg-sepia-200'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-bold text-lg ${
                            theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                          }`}>
                            {content.title}
                          </h3>
                          <p className={`${
                            theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            by {content.author} • {content.type}
                          </p>
                          <p className={`text-sm ${
                            theme === 'sepia' ? 'text-sepia-500' : 'text-gray-500'
                          }`}>
                            {content.reportCount} report{content.reportCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className={`text-2xl font-bold ${
                  theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                }`}>
                  User Reports
                </h2>

                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className={`p-6 rounded-xl ${
                      theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                              report.type === 'Inappropriate Content' ? 'bg-red-100 text-red-800' :
                              report.type === 'Spam' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {report.type}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              report.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                              report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          <h3 className={`font-semibold ${
                            theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                          }`}>
                            {report.target}
                          </h3>
                          <p className={`text-sm ${
                            theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            Reported by {report.reporter} on {report.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            Investigate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <h2 className={`text-2xl font-bold ${
                  theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                }`}>
                  Platform Analytics
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className={`p-6 rounded-xl ${
                    theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                    }`}>
                      User Growth
                    </h3>
                    <div className={`h-64 rounded-lg flex items-center justify-center ${
                      theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
                    }`}>
                      <p className={`${
                        theme === 'sepia' ? 'text-sepia-600' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        Chart placeholder
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-xl ${
                    theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                    }`}>
                      Content Statistics
                    </h3>
                    <div className={`h-64 rounded-lg flex items-center justify-center ${
                      theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
                    }`}>
                      <p className={`${
                        theme === 'sepia' ? 'text-sepia-600' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        Chart placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className={`text-2xl font-bold ${
                  theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                }`}>
                  System Settings
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className={`p-6 rounded-xl ${
                    theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                    }`}>
                      Platform Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`${
                          theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          User Registration
                        </span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`${
                          theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          Content Auto-Approval
                        </span>
                        <input type="checkbox" className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`${
                          theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          Email Notifications
                        </span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${
                    theme === 'sepia' ? 'bg-sepia-200' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
                    }`}>
                      Content Policies
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          Max Chapter Length (words)
                        </label>
                        <input
                          type="number"
                          defaultValue="10000"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            theme === 'sepia'
                              ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          Auto-Report Threshold
                        </label>
                        <input
                          type="number"
                          defaultValue="5"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            theme === 'sepia'
                              ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}
                        />
                      </div>
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

export default AdminDashboard;