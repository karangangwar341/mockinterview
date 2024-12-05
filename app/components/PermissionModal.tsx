import React from 'react';
import { FaCamera, FaMicrophone, FaDesktop } from 'react-icons/fa'; // Importing relevant icons

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  permissionType: 'camera' | 'microphone' | 'screen';
  status: 'idle' | 'requesting' | 'granted' | 'denied';
}

export function PermissionModal({
  isOpen,
  onClose,
  onConfirm,
  permissionType,
  status,
}: PermissionModalProps) {
  if (!isOpen) return null;

  const renderIcon = () => {
    switch (permissionType) {
      case 'camera':
        return <FaCamera className="text-4xl text-white" />;
      case 'microphone':
        return <FaMicrophone className="text-4xl text-white" />;
      case 'screen':
        return <FaDesktop className="text-4xl text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-xl max-w-lg w-full shadow-2xl">
        <h2 className="text-3xl font-semibold text-white mb-6 flex items-center">
          {renderIcon()}
          <span className="ml-3">Permission Required</span>
        </h2>

        <p className="text-lg text-white mb-6">
          This application needs access to your {permissionType} to proceed. Please allow access when prompted by your browser.
        </p>

        {status === 'requesting' && (
          <p className="text-yellow-300 mb-4">Requesting permission...</p>
        )}

        {status === 'granted' && (
          <p className="text-green-300 mb-4">Permission granted! 🎉</p>
        )}

        {status === 'denied' && (
          <p className="text-red-300 mb-4">
            Permission denied. Please try again or check your browser settings.
          </p>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Close
          </button>

          {status !== 'granted' && (
            <button
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              {status === 'denied' ? 'Retry' : 'Allow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
