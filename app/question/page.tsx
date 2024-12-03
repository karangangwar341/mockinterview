'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Question() {
  const [question, setQuestion] = useState("Tell me about yourself.")
  const [audioEnded, setAudioEnded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulate audio playback
    const timer = setTimeout(() => {
      setAudioEnded(true)
    }, 5000) // Assume 5 seconds for audio playback

    return () => clearTimeout(timer)
  }, [])

  const handleNextQuestion = () => {
    router.push('/answer')
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Interview Question</h1>
      <p className="text-xl mb-8">{question}</p>
      {!audioEnded && <p className="text-yellow-400">Playing audio...</p>}
      {audioEnded && (
        <button
          onClick={handleNextQuestion}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Answer Question
        </button>
      )}
    </div>
  )
}

