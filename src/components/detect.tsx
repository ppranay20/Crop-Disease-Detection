'use client'

import { useState } from 'react'
import {Layout} from './layout'
import { Upload, AlertCircle, Loader, Check } from 'lucide-react'

export function Detect() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResult({
        disease: 'Leaf Rust',
        confidence: 0.92,
        recommendations: [
          'Apply fungicide treatment',
          'Improve air circulation around plants',
          'Remove and destroy infected leaves'
        ]
      })
    } catch (error) {
      console.error('Error:', error)
      setResult({ error: 'An error occurred during detection.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Crop Disease Detection</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="mb-8">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 hover:border-green-500"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-w-full h-auto mx-auto mb-4 rounded-lg" />
              ) : (
                <div className="text-gray-500">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <p className="text-lg mb-2">Drag and drop an image here, or click to select a file</p>
                  <p className="text-sm text-gray-400">Supported formats: JPG, PNG, GIF (max 5MB)</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-200"
              >
                Select Image
              </label>
            </div>
            <button
              type="submit"
              disabled={!file || loading}
              className="mt-6 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                'Detect Disease'
              )}
            </button>
          </form>

          {result && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detection Results</h2>
              {result.error ? (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {result.error}
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <Check className="w-6 h-6 text-green-500 mr-2" />
                    <p className="text-lg font-medium">
                      Detected: <span className="text-green-600">{result.disease}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="text-lg mb-2">
                      <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Recommended Actions:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {result.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-green-100 rounded-full mr-2 flex-shrink-0 mt-1"></span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}