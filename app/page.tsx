'use client'
import React from 'react'
import MainHeader from '@/components/MainHeader'

import SongInput from '@/components/SongInput'
import MainYellowButtons from '@/components/MainYellowButtons'
import SubHeader from '@/components/SubHeader'
import Footer from '@/components/Footer'
import Carousel from '@/components/Carousel'
import { useTimer } from '../context/TimerContext';

const Page = () => {
  const { timer, setTimer } = useTimer();
  return (
    <div className='bg-custom-bg min-h-screen flex flex-col text-white'>
      <MainHeader/>
      <div className='flex items-center justify-center'>
      {
        timer > 0 ? <div className='text-white w-[250px] h-[75px] bg-custom-red bg-opacity-70 flex items-center justify-center'>{Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</div> : <></>
      }
      </div>
      <div className='flex items-center justify-center'>
      {
        timer > 0 ? <div className="mt-16">you can copy the <span className='text-custom-yellow'>ID</span> ABOVE AND <span className='text-custom-yellow'>SEARCH FOR YOUR DANCE</span>  AFTER the timer times out using this <span className='text-custom-yellow'>ID</span></div> : <></>
      }
      </div>
      <div className='flex justify-center mt-24 mb-8'> <MainYellowButtons/></div>
      <div className='flex items-center justify-center mb-24'>
        <SongInput/>
      </div>
      <SubHeader/>
      <Carousel/>
      {/* <div className='flex items-center justify-center mt-16'>
        <div className=' w-1/2 '><ExampleCardMain song_name='Starboy' mp3_url='/' fbx_url='/'/></div>
      </div> */}
      
        {/* <FBXViewer url="https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/70b3bf12-d234-4f0c-8ef5-502d30502f16.fbx" /> */}
        <Footer/>
    </div>
  )
}

export default Page