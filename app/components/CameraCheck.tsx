'use client'

import { useState, useRef, useEffect } from 'react'
import { PermissionModal } from './PermissionModal'

interface CameraCheckProps {
  granted: boolean
  onPermissionChange: (granted: boolean) => void
}

export default function CameraCheck({ granted, onPermissionChange }: CameraCheckProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  const handleCameraCheck = async () => {
    setIsModalOpen(true)
    setPermissionStatus('idle')
  }

  const handleConfirmPermission = async () => {
    setPermissionStatus('requesting')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      setPermissionStatus('granted')
      onPermissionChange(true)
      setError(null)
    } catch (err) {
      console.error('Error accessing camera:', err)
      setPermissionStatus('denied')
      setError('Failed to access camera. Please check your browser settings.')
      onPermissionChange(false)
    }
  }

  const handleStop = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setPermissionStatus('idle')
      onPermissionChange(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Camera</h2>
      <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
        {stream ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Camera preview
          </div>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!granted ? (
        <button
          onClick={handleCameraCheck}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Check Camera
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Stop Camera
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
        permissionType="camera"
        status={permissionStatus}
      />
    </div>
  )
}

