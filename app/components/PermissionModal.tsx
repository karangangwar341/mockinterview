import React from 'react'

interface PermissionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  permissionType: 'camera' | 'microphone' | 'screen'
  status: 'idle' | 'requesting' | 'granted' | 'denied'
}

export function PermissionModal({ isOpen, onClose, onConfirm, permissionType, status }: PermissionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Permission Required</h2>
        <p className="mb-6">
          This application needs access to your {permissionType} to proceed. Please allow access when prompted by your browser.
        </p>
        {status === 'requesting' && (
          <p className="text-yellow-400 mb-4">Requesting permission...</p>
        )}
        {status === 'granted' && (
          <p className="text-green-400 mb-4">Permission granted!</p>
        )}
        {status === 'denied' && (
          <p className="text-red-400 mb-4">Permission denied. Please try again or check your browser settings.</p>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Close
          </button>
          {status !== 'granted' && (
            <button
              onClick={onConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              {status === 'denied' ? 'Retry' : 'Allow'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

