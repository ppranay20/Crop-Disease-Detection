'use client'

import { useState } from 'react'
import {Layout} from './layout'
import { Search, BookOpen, Video, FileText } from 'lucide-react'

const resources = [
  { id: 1, title: 'Understanding Common Crop Diseases', type: 'article', category: 'Disease Management' },
  { id: 2, title: 'Effective Pesticide Application Techniques', type: 'video', category: 'Pest Control' },
  { id: 3, title: 'Soil Health and Crop Rotation', type: 'guide', category: 'Soil Management' },
  { id: 4, title: 'Integrated Pest Management Strategies', type: 'article', category: 'Pest Control' },
  { id: 5, title: 'Water Conservation in Agriculture', type: 'video', category: 'Water Management' },
  { id: 6, title: 'Organic Farming Practices', type: 'guide', category: 'Organic Farming' },
]

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || resource.category === selectedCategory)
  )

  const categories = ['All', ...Array.from(new Set(resources.map((r) => r.category)))]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Resources and Education</h1>
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {resource.type === 'article' && <BookOpen className="w-5 h-5 mr-2 text-blue-500" />}
                {resource.type === 'video' && <Video className="w-5 h-5 mr-2 text-red-500" />}
                {resource.type === 'guide' && <FileText className="w-5 h-5 mr-2 text-green-500" />}
                <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{resource.category}</p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
                View Resource
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}