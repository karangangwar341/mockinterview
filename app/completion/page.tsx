import Link from 'next/link'

export default function Completion() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Interview Complete!</h1>
      <p className="text-xl mb-8">
        Congratulations on completing your mock interview. Our AI is analyzing your responses and will provide feedback shortly.
      </p>
      <Link 
        href="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  )
}

