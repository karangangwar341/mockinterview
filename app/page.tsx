import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-6 text-center">AI Mock Interview</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Prepare for your next interview with our AI-powered mock interview system. 
        Practice answering questions and receive instant feedback to improve your skills.
      </p>
      <Link 
        href="/instructions" 
        className="hover:bg-blue-600 border-2 rounded-[20px] text-white font-bold py-3 px-6 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  )
}

