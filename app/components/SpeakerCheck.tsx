'use client'

import { useState, useRef } from 'react'

interface SpeakerCheckProps {
  granted: boolean
  onPermissionChange: (granted: boolean) => void
}

export default function SpeakerCheck({ granted, onPermissionChange }: SpeakerCheckProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleSpeakerCheck = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          onPermissionChange(true)
          setError(null)
        })
        .catch((err) => {
          console.error('Error playing audio:', err)
          setError('Failed to play audio. Please check your browser settings.')
          onPermissionChange(false)
        })
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Speaker</h2>
      <audio ref={audioRef} onEnded={handleAudioEnded}>
  <source src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSpeakerCheck}
        disabled={isPlaying}
        className={`${
          isPlaying ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out`}
      >
        {isPlaying ? 'Playing...' : 'Test Speaker'}
      </button>
    </div>
  )
}

