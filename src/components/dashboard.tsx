'use client'

import { useState } from 'react'
import {Layout} from './layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockData = [
  { month: 'Jan', detections: 12 },
  { month: 'Feb', detections: 19 },
  { month: 'Mar', detections: 3 },
  { month: 'Apr', detections: 5 },
  { month: 'May', detections: 2 },
  { month: 'Jun', detections: 3 },
]

export function Dashboard() {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Disease Detections Over Time</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-2 py-1 border rounded-md"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="detections" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Detections</h2>
            <ul className="space-y-2">
              {[
                { disease: 'Leaf Rust', date: '2023-06-15' },
                { disease: 'Powdery Mildew', date: '2023-06-10' },
                { disease: 'Bacterial Blight', date: '2023-06-05' },
              ].map((detection, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{detection.disease}</span>
                  <span className="text-gray-500">{detection.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Health Summary</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Overall Health Score</span>
                <span className="font-semibold text-green-600">85%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Disease-free Crops</span>
                <span className="font-semibold">75%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>At-risk Crops</span>
                <span className="font-semibold text-yellow-600">20%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Infected Crops</span>
                <span className="font-semibold text-red-600">5%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}