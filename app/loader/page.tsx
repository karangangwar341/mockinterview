'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Loader() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/completion')
    }, 3000) // Simulate 3 seconds of loading

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-xl">Analyzing your response...</p>
    </div>
  )
}

