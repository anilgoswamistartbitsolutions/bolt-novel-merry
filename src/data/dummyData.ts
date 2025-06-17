export interface Novel {
  id: string;
  title: string;
  author: string;
  authorId: string;
  cover: string;
  genre: string[];
  status: 'ongoing' | 'completed' | 'hiatus';
  rating: number;
  totalReads: number;
  totalChapters: number;
  description: string;
  tags: string[];
  lastUpdated: string;
  isBookmarked?: boolean;
  isInLibrary?: boolean;
}

export interface Chapter {
  id: string;
  novelId: string;
  title: string;
  content: string;
  chapterNumber: number;
  publishedAt: string;
  isRead?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export const featuredNovels: Novel[] = [
  {
    id: '1',
    title: 'The Chronicles of Mystic Realms',
    author: 'Elena Starweaver',
    authorId: 'author1',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: ['Fantasy', 'Adventure'],
    status: 'ongoing',
    rating: 4.8,
    totalReads: 1250000,
    totalChapters: 156,
    description: 'In a world where magic flows through ancient ley lines, young Aria discovers she possesses a rare gift that could either save or destroy the realm. Follow her journey as she navigates political intrigue, forbidden romance, and an ancient prophecy that speaks of a chosen one who will unite the scattered kingdoms.',
    tags: ['Magic', 'Romance', 'Politics', 'Prophecy'],
    lastUpdated: '2024-01-15',
    isBookmarked: true,
    isInLibrary: true
  },
  {
    id: '2',
    title: 'Digital Hearts',
    author: 'Marcus Chen',
    authorId: 'author2',
    cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: ['Romance', 'Contemporary'],
    status: 'completed',
    rating: 4.6,
    totalReads: 890000,
    totalChapters: 89,
    description: 'A heartwarming story about love in the digital age. When app developer Jake meets bookstore owner Sofia through a dating app glitch, their virtual connection blossoms into something real and beautiful.',
    tags: ['Modern Romance', 'Technology', 'Small Town'],
    lastUpdated: '2024-01-10',
    isBookmarked: false,
    isInLibrary: true
  },
  {
    id: '3',
    title: 'Shadow of the Ancient Empire',
    author: 'Dr. Alexandra Blackwood',
    authorId: 'author3',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: ['Historical Fiction', 'Mystery'],
    status: 'ongoing',
    rating: 4.7,
    totalReads: 567000,
    totalChapters: 78,
    description: 'An archaeological thriller that spans millennia. Dr. Sarah Mitchell uncovers a conspiracy that threatens to rewrite history itself, connecting ancient civilizations with modern-day power struggles.',
    tags: ['Archaeology', 'Conspiracy', 'Ancient History'],
    lastUpdated: '2024-01-12',
    isBookmarked: true,
    isInLibrary: false
  }
];

export const trendingNovels: Novel[] = [
  {
    id: '4',
    title: 'Neon Shadows',
    author: 'Kai Nakamura',
    authorId: 'author4',
    cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: ['Cyberpunk', 'Thriller'],
    status: 'ongoing',
    rating: 4.5,
    totalReads: 445000,
    totalChapters: 45,
    description: 'In 2087, corporate hacker Zara infiltrates the most secure networks in Neo-Tokyo, but when she stumbles upon a conspiracy involving AI consciousness, she must choose between profit and humanity.',
    tags: ['Cyberpunk', 'AI', 'Corporate Espionage'],
    lastUpdated: '2024-01-14',
  },
  {
    id: '5',
    title: 'The Last Bookkeeper',
    author: 'Isabella Rodriguez',
    authorId: 'author5',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: ['Fantasy', 'Drama'],
    status: 'ongoing',
    rating: 4.9,
    totalReads: 789000,
    totalChapters: 67,
    description: 'In a world where books are becoming extinct, librarian Emma discovers that stories have the power to literally come alive. She becomes the guardian of humanity\'s last hope for preserving imagination.',
    tags: ['Books', 'Magic Realism', 'Preservation'],
    lastUpdated: '2024-01-13',
  }
];

export const sampleChapters: Chapter[] = [
  {
    id: 'ch1',
    novelId: '1',
    title: 'The Awakening',
    chapterNumber: 1,
    content: `The morning mist clung to the ancient stones of Silverfall Academy like whispered secrets from another age. Aria Moonwhisper pressed her palm against the cool surface of her dormitory window, watching as the first rays of dawn painted the sky in shades of rose and gold.

Today was different. She could feel it in the very air around her, a subtle shift in the magical currents that flowed through the academy grounds. The pendant at her throat—a family heirloom passed down through generations—pulsed with a soft, ethereal light.

"Another sleepless night?" came a voice from behind her.

Aria turned to see her roommate, Luna Starfall, emerging from beneath a pile of covers that looked more like a cocoon than a bed. Luna's silver hair caught the early morning light, giving her an almost otherworldly appearance.

"I keep having the same dream," Aria admitted, moving away from the window. "There's a voice calling to me from somewhere deep within the Whispering Woods. It sounds... familiar, somehow."

Luna sat up, suddenly alert. "The Whispering Woods? Aria, you know students aren't allowed there. The magical barriers are too unstable, and the creatures that dwell within—"

"I know," Aria interrupted, but her gaze drifted back to the window, toward the dark line of trees that marked the edge of the forbidden forest. "But the voice... it's getting stronger. More insistent."

As if summoned by her words, the pendant at her throat flared with brilliant light, casting dancing shadows across the room. Both girls stared in amazement as ancient symbols appeared in the air around them, glowing with the same ethereal radiance.

"What in the realm..." Luna whispered.

The symbols pulsed once, twice, then faded away, leaving only the echo of power in the air and the sound of approaching footsteps in the corridor outside.`,
    publishedAt: '2024-01-15T10:00:00Z',
    isRead: true,
    isBookmarked: true
  }
];

export const communityPosts = [
  {
    id: 'post1',
    title: 'Theory: Is Aria actually from the Ancient Empire?',
    author: 'TheoryMaster92',
    content: 'I\'ve been re-reading Chronicles of Mystic Realms and I noticed some interesting parallels...',
    likes: 234,
    replies: 45,
    timestamp: '2 hours ago',
    tags: ['Theory', 'Chronicles of Mystic Realms']
  },
  {
    id: 'post2',
    title: 'Digital Hearts made me cry happy tears',
    author: 'BookwormBella',
    content: 'Just finished reading Digital Hearts and I\'m an emotional mess. The ending was perfect!',
    likes: 156,
    replies: 28,
    timestamp: '4 hours ago',
    tags: ['Review', 'Digital Hearts']
  }
];

export const userLibrary = {
  readingNow: featuredNovels.slice(0, 2),
  favorites: [featuredNovels[0], trendingNovels[1]],
  bookmarks: sampleChapters,
  customLists: [
    {
      id: 'list1',
      name: 'Fantasy Favorites',
      novels: [featuredNovels[0], trendingNovels[1]],
      isPublic: false
    },
    {
      id: 'list2',
      name: 'Must Read Romance',
      novels: [featuredNovels[1]],
      isPublic: true
    }
  ]
};