'use client'

import { error } from 'console';
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Instructions() {
  const videoRef= useRef(null);
  useEffect(()=>{
    async function getCameraStream() {
      try {
        const stream=await navigator.mediaDevices.getUserMedia({video: true});
     
     if(videoRef.current){
      videoRef.current.srcObject=stream;
     }
     } catch (err){
      console.error('error accessing camera:',err);
     }
    }
     getCameraStream();
     return()=>
      {
        if (videoRef.current && videoRef.current.srcObject){
           const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
      }    
    };
  },[]);
  return (
    <div className='flex mx-4 w-full gap-24 font-light mt-12'>
      <div className='flex flex-col gap-8 w-1/2'>
        <h1 className='text-2xl font-bold'>Trainee Interview</h1>
        <div className="my-4"> <video ref={videoRef} autoPlay className="rounded-lg border-2 border-gray-300 w-full"></video> </div>
      </div>
      <div className="w-1/2 mx-auto">
        <div className='w-full h-auto pb-12 flex justify-end gap-2' >
          <section className='ring-1 ring-white/30 px-3 py-2 font-light rounded-lg flex gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark h-5 w-5 text-orange-500" > {/* Replace the following comment with your SVG path data */} <path d="M12 2L2 7h20L12 2z" /> <path d="M2 9h20v2H2z" /> <path d="M4 12v8h2v-8H4z" /> <path d="M10 12v8h4v-8h-4z" /> <path d="M18 12v8h2v-8h-2z" /> </svg>
            Zeko</section>
          <section className='ring-1 ring-white/30 px-3 py-2 flex rounded-lg gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-5 w-5 text-red-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            26 minutes</section>
        </div>
        <h1 className="text-xl font-bold mb-6">Instructions</h1>
        <ol className="list-decimal list-inside space-y-4 mb-8">
          <li>Ensure stable internet and choose a clean, quiet location.</li>
          <li>Permission for access of camera, microphone, and entire screen sharing is required.</li>
          <li>Be in professional attire and avoid distractions.</li>
          <li>Give a detailed response, providing as much information as you can.</li>
          <li>Answer the question with examples and projects you’ve worked on.</li>
        </ol>
        <div className='p-4 rounded-xl bg-white/5'>
          <p><a className=' text-purple-400'>CLick here</a> to try a mock interview with Avya, our AI interviewer, and build your confidence before main interview!</p>

        </div>
        {/* <div className="text-center w-full">
          <Link
            href="/permissions"
            className="bg-green-600 w-full hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Next: Check Permissions
          </Link>
        </div> */}
        <div className='mt-12 flex items-center justify-center w-full'>
          <Link
          className='bg-[#6c60f4] font-medium hover:bg-green-600 rounded-xl p-3 w-full text-center'
          href="/permissions"
          >Next: Check Permissions</Link>
        </div>
      </div>

    </div>
  )
}

