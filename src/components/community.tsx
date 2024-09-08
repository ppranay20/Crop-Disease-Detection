'use client'

import { useState } from 'react'
import {Layout} from './layout'
import { MessageSquare, ThumbsUp, Clock, Search } from 'lucide-react'

const mockPosts = [
  { id: 1, title: 'Best practices for dealing with tomato blight?', author: 'GreenThumb', replies: 12, likes: 25, date: '2023-06-15' },
  { id: 2, title: 'Organic solutions for aphid infestations', author: 'OrganicFarmer', replies: 8, likes: 19, date: '2023-06-14' },
  { id: 3, title: 'Water conservation techniques during drought', author: 'WaterWise', replies: 15, likes: 32, date: '2023-06-13' },
  { id: 4, title: 'Identifying and managing wheat rust', author: 'CropDoctor', replies: 6, likes: 11, date: '2023-06-12' },
]

export function Community() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const filteredPosts = mockPosts
    .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === 'popular') return b.likes - a.likes
      return 0
    })

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Community Forum</h1>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <span className="mr-4">By {post.author}</span>
                <span className="flex items-center mr-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.date}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="flex items-center mr-4">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {post.replies} replies
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {post.likes} likes
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
          Start New Discussion
        </button>
      </div>
    </Layout>
  )
}