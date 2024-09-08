'use client'

import {Layout} from './layout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to CropCare AI</h1>
        <p className="text-xl text-gray-600 mb-8">
          Revolutionize your farming with AI-powered crop disease detection and management. Reduce losses, boost productivity, and cultivate healthier crops.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FeatureCard
            title="Early Disease Detection"
            description="Identify crop diseases in their early stages to prevent widespread damage."
          />
          <FeatureCard
            title="Personalized Recommendations"
            description="Get tailored advice on how to manage and treat detected diseases effectively."
          />
          <FeatureCard
            title="Historical Insights"
            description="Track disease patterns over time to improve your crop management strategies."
          />
          <FeatureCard
            title="Community Support"
            description="Connect with other farmers and experts to share knowledge and experiences."
          />
        </div>
        <Link
          href="/detect"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Start Disease Detection
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </Layout>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}