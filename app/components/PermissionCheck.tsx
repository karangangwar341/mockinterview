import { CheckCircle, XCircle } from 'lucide-react'

interface PermissionCheckProps {
  label: string
  granted: boolean
  onCheck: () => void
}

export default function PermissionCheck({ label, granted, onCheck }: PermissionCheckProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <span className="text-lg">{label}</span>
      {granted ? (
        <CheckCircle className="text-green-500 w-6 h-6" />
      ) : (
        <button
          onClick={onCheck}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Check {label}
        </button>
      )}
    </div>
  )
}

