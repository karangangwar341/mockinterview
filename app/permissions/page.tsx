'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CameraCheck from '../components/CameraCheck'
import MicrophoneCheck from '../components/MicrophoneCheck'
import SpeakerCheck from '../components/SpeakerCheck'
import ScreenShareCheck from '../components/ScreenShareCheck'

export default function Permissions() {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    speaker: false,
    screenShare: false,
  })
  const router = useRouter()

  const updatePermission = (key: keyof typeof permissions, value: boolean) => {
    setPermissions(prev => ({ ...prev, [key]: value }))
  }

  const allPermissionsGranted = Object.values(permissions).every(Boolean)

  const handleContinue = () => {
    if (allPermissionsGranted) {
      router.push('/question')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Check Permissions</h1>
      <div className="space-y-8 mb-8">
        <CameraCheck
          granted={permissions.camera}
          onPermissionChange={(granted) => updatePermission('camera', granted)}
        />
        <MicrophoneCheck
          granted={permissions.microphone}
          onPermissionChange={(granted) => updatePermission('microphone', granted)}
        />
        <SpeakerCheck
          granted={permissions.speaker}
          onPermissionChange={(granted) => updatePermission('speaker', granted)}
        />
        <ScreenShareCheck
          granted={permissions.screenShare}
          onPermissionChange={(granted) => updatePermission('screenShare', granted)}
        />
      </div>
      <div className="text-center">
        {allPermissionsGranted ? (
          <button 
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Continue to Interview
          </button>
        ) : (
          <p className="text-yellow-400">Please grant all permissions to continue</p>
        )}
      </div>
    </div>
  )
}

