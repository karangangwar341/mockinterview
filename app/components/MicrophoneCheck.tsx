'use client'

import { useState, useRef, useEffect } from 'react'
import { PermissionModal } from './PermissionModal'

interface MicrophoneCheckProps {
  granted: boolean
  onPermissionChange: (granted: boolean) => void
}

export default function MicrophoneCheck({ granted, onPermissionChange }: MicrophoneCheckProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [volume, setVolume] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle')
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (stream) {
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      analyserRef.current.fftSize = 256
      const bufferLength = analyserRef.current.frequencyBinCount
      dataArrayRef.current = new Uint8Array(bufferLength)

      const updateVolume = () => {
        if (analyserRef.current && dataArrayRef.current) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current)
          const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length
          setVolume(average)
        }
        animationFrameRef.current = requestAnimationFrame(updateVolume)
      }
      updateVolume()
    }
  }, [stream])

  const handleMicrophoneCheck = () => {
    setIsModalOpen(true)
    setPermissionStatus('idle')
  }

  const handleConfirmPermission = async () => {
    setPermissionStatus('requesting')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setStream(mediaStream)
      setPermissionStatus('granted')
      onPermissionChange(true)
      setError(null)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      setPermissionStatus('denied')
      setError('Failed to access microphone. Please check your browser settings.')
      onPermissionChange(false)
    }
  }

  const handleStop = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setVolume(0)
      setPermissionStatus('idle')
      onPermissionChange(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Microphone</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!granted ? (
        <button
          onClick={handleMicrophoneCheck}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full transition duration-300 ease-in-out"
          >
          Check Microphone
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Stop Microphone
        </button>
      )}
      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          if (permissionStatus !== 'granted') {
            setPermissionStatus('idle')
          }
        }}
        onConfirm={handleConfirmPermission}
        permissionType="microphone"
        status={permissionStatus}
      />
    </div>
  )
}

