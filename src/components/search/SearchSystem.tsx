import { useState, useEffect } from 'react';
import { Search, X, ExternalLink, UserPlus, UserCheck, Flame, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock user data structure
interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
  hasXAccount: boolean;
  xUsername?: string;
  xProfileUrl?: string;
  walletAddress: string;
  followers: number;
  totalTips: number;
  gradient: string;
}

// Mock post data structure
interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  isXPost: boolean;
  xPostUrl?: string;
  likes: number;
  hasXAccount: boolean;
}

// Mock data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: '@sarah_creates',
    avatar: '🎨',
    bio: 'Digital artist creating vibrant Web3 art',
    isFollowing: false,
    hasXAccount: true,
    xUsername: '@sarahchen_art',
    xProfileUrl: 'https://twitter.com/sarahchen_art',
    walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    followers: 2450,
    totalTips: 145.5,
    gradient: 'linear-gradient(135deg, #FF8C42 0%, #F2A541 100%)'
  },
  {
    id: '2',
    name: 'Alex Rivera',
    username: '@alex_dev',
    avatar: '💻',
    bio: 'Building the future of Web3',
    isFollowing: true,
    hasXAccount: true,
    xUsername: '@alexrivera_dev',
    xProfileUrl: 'https://twitter.com/alexrivera_dev',
    walletAddress: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    followers: 1820,
    totalTips: 89.3,
    gradient: 'linear-gradient(135deg, #0E4D5F 0%, #1A9BA8 100%)'
  },
  {
    id: '3',
    name: 'Maya Johnson',
    username: '@maya_music',
    avatar: '🎵',
    bio: 'Musician • Producer • Web3 enthusiast',
    isFollowing: false,
    hasXAccount: false,
    walletAddress: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
    followers: 3200,
    totalTips: 210.8,
    gradient: 'linear-gradient(135deg, #1A9BA8 0%, #6ED1C5 100%)'
  },
  {
    id: '4',
    name: 'Leo Park',
    username: '@leo_writes',
    avatar: '✍️',
    bio: 'Writer exploring blockchain stories',
    isFollowing: true,
    hasXAccount: true,
    xUsername: '@leopark_writer',
    xProfileUrl: 'https://twitter.com/leopark_writer',
    walletAddress: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
    followers: 890,
    totalTips: 56.7,
    gradient: 'linear-gradient(135deg, #FF686B 0%, #FF8C42 100%)'
  }
];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Alex Rivera',
    userAvatar: '💻',
    content: 'Just deployed my first smart contract on Polkadot! The future is decentralized 🚀',
    timestamp: '2 hours ago',
    isXPost: true,
    xPostUrl: 'https://twitter.com/alexrivera_dev/status/1234567890',
    likes: 145,
    hasXAccount: true
  },
  {
    id: '2',
    userId: '4',
    userName: 'Leo Park',
    userAvatar: '✍️',
    content: 'New article: "Understanding Web3 Identity Systems" - Link in bio',
    timestamp: '5 hours ago',
    isXPost: true,
    xPostUrl: 'https://twitter.com/leopark_writer/status/1234567891',
    likes: 89,
    hasXAccount: true
  }
];

export default function EkeneSearchSystem() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Simulate search with debounce
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.xUsername?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, users]);

  const handleFollow = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    ));
    setSearchResults(prev => prev.map(user => 
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    ));
  };

  const handleTip = (user: User) => {
    setSelectedUser(user);
    setShowTipModal(true);
  };

  const handleOpenXProfile = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleOpenXPost = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const filteredPosts = activeTab === 'following' 
    ? posts.filter(post => users.find(u => u.id === post.userId)?.isFollowing)
    : posts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E8] via-[#FEFCF8] to-[#E6F7F9] pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#F2A541]/30 to-[#FF686B]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#0E4D5F]/30 to-[#1A9BA8]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#0E4D5F] via-[#1A9BA8] to-[#0E4D5F] border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            Search & Connect
          </h1>
          <p className="text-sm text-white/80">Find creators and stay updated with their content</p>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, or X handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#F2A541] focus:ring-4 focus:ring-[#F2A541]/10 outline-none transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full max-w-2xl mx-auto mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto"
              >
                {isSearching ? (
                  <div className="p-8 text-center">
                    <div className="inline-block w-8 h-8 border-4 border-[#F2A541] border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-500">Searching...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No users found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                            style={{ background: user.gradient }}
                          >
                            {user.avatar}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                              {user.hasXAccount && (
                                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{user.username}</p>
                            {user.hasXAccount && (
                              <p className="text-xs text-[#1DA1F2] truncate">{user.xUsername}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {user.hasXAccount && (
                              <button
                                onClick={() => handleOpenXProfile(user.xProfileUrl)}
                                className="p-2 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-all"
                                title="View X profile"
                              >
                                <ExternalLink className="w-4 h-4 text-[#1DA1F2]" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleFollow(user.id)}
                              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                                user.isFollowing
                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  : 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white hover:shadow-lg'
                              }`}
                            >
                              {user.isFollowing ? (
                                <>
                                  <UserCheck className="w-4 h-4 inline mr-1" />
                                  Following
                                </>
                              ) : (
                                <>
                                  <UserPlus className="w-4 h-4 inline mr-1" />
                                  Follow
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleTip(user)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white font-semibold text-sm hover:shadow-lg transition-all"
                            >
                              <Flame className="w-4 h-4 inline mr-1" />
                              Tip
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Activity Feed Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-lg border border-gray-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'following'
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Following
          </button>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl p-12 text-center shadow-lg"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Activity Yet</h3>
                <p className="text-gray-500">
                  {activeTab === 'following' 
                    ? 'Follow some creators to see their latest posts here'
                    : 'No recent activity from your network'}
                </p>
              </motion.div>
            ) : (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#F2A541] flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                      {post.userAvatar}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{post.userName}</h3>
                        {post.hasXAccount && (
                          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                        )}
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                        {post.isXPost && (
                          <span className="ml-auto text-xs bg-[#1DA1F2]/10 text-[#1DA1F2] px-2 py-1 rounded-full font-semibold">
                            X Post
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <button className="hover:text-red-500 transition-colors">
                            ❤️
                          </button>
                          <span className="text-sm font-semibold">{post.likes}</span>
                        </div>

                        {post.isXPost && post.xPostUrl && (
                          <button
                            onClick={() => handleOpenXPost(post.xPostUrl)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] rounded-xl transition-all text-sm font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on X
                          </button>
                        )}

                        <button
                          onClick={() => {
                            const user = users.find(u => u.id === post.userId);
                            if (user) handleTip(user);
                          }}
                          className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <Flame className="w-4 h-4" />
                          Tip Creator
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tip Modal */}
      <AnimatePresence>
        {showTipModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTipModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6"
            >
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                  style={{ background: selectedUser.gradient }}
                >
                  {selectedUser.avatar}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">{selectedUser.username}</p>
              </div>

              <div className="bg-gradient-to-br from-[#FFF5E8] to-[#FFE8D6] rounded-2xl p-6 mb-6">
                <p className="text-center text-gray-700 mb-4">
                  Send a tip to support {selectedUser.name.split(' ')[0]}
                </p>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[1, 5, 10, 20].map(amount => (
                    <button
                      key={amount}
                      className="py-3 rounded-xl bg-white hover:bg-gradient-to-r hover:from-[#FF8C42] hover:to-[#F2A541] hover:text-white transition-all font-bold border-2 border-gray-100 hover:border-transparent hover:shadow-lg"
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount..."
                  className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-[#F2A541] focus:ring-4 focus:ring-[#F2A541]/10 outline-none transition-all text-center font-bold"
                />
              </div>

              <button
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#F2A541] text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" />
                Send Tip
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}