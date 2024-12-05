'use client'

import { useState } from 'react'
import { PermissionModal } from './PermissionModal'

interface ScreenShareCheckProps {
  granted: boolean
  onPermissionChange: (granted: boolean) => void
}

export default function ScreenShareCheck({ granted, onPermissionChange }: ScreenShareCheckProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle')

  const handleScreenShareCheck = () => {
    setIsModalOpen(true)
    setPermissionStatus('idle')
  }

  const handleConfirmPermission = async () => {
    setPermissionStatus('requesting')
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      setStream(mediaStream)
      setPermissionStatus('granted')
      onPermissionChange(true)
      setError(null)

      // Add event listener for when the user stops sharing
      mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
        handleStop()
      })
    } catch (err) {
      console.error('Error accessing screen share:', err)
      setPermissionStatus('denied')
      setError('Failed to start screen sharing. Please check your browser settings.')
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
      <h2 className="text-2xl font-bold mb-4">Screen Sharing</h2>
      <p className="mb-4">
        {granted
          ? 'Screen sharing is enabled. You can share your screen during the interview if needed.'
          : 'Click the button below to test screen sharing.'}
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!granted ? (
        <button
          onClick={handleScreenShareCheck}
          className="bg-blue-600 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-xl w-full transition duration-300 ease-in-out"
        >
          Test Screen Sharing
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Stop Screen Sharing
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
        permissionType="screen"
        status={permissionStatus}
      />
    </div>
  )
}

