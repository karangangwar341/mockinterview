import Link from 'next/link'

export default function Instructions() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">How It Works</h1>
      <ol className="list-decimal list-inside space-y-4 mb-8">
        <li>Grant necessary permissions for camera, microphone, and screen sharing.</li>
        <li>You'll be presented with a series of common interview questions.</li>
        <li>Listen to each question carefully.</li>
        <li>Respond to each question as if you were in a real interview.</li>
        <li>Your responses will be recorded for analysis.</li>
        <li>After the interview, you'll receive an AI-generated assessment and tips for improvement.</li>
      </ol>
      <div className="text-center">
        <Link 
          href="/permissions" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Next: Check Permissions
        </Link>
      </div>
    </div>
  )
}

