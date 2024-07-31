'use client'
import React from 'react'
import MainHeader from '@/components/MainHeader'

import SongInput from '@/components/SongInput'
import MainYellowButtons from '@/components/MainYellowButtons'
import SubHeader from '@/components/SubHeader'
import Carousel from '@/components/Carousel'
import { useTimer } from '../contexts/TimerContext';

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
    </div>
  )
}

export default Page