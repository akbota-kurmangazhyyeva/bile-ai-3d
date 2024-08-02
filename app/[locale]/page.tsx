'use client'
import React from 'react'
import MainHeader from '@/components/MainHeader'
import SongInput from '@/components/SongInput'
import MainYellowButtons from '@/components/MainYellowButtons'
import { useTimer } from '@/contexts/TimerContext';
import Link from 'next/link'
import { useText } from '@/contexts/TextContext'
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import {useTranslations} from 'next-intl';

const Page = () => {
  const { timer, setTimer } = useTimer();
  const { text } = useText();
  const t = useTranslations('HomePage');
  const handleCopy = () => {
    const request_number = localStorage.getItem('request_number')
    if (request_number) {
      navigator.clipboard.writeText(request_number)
        .then(() => {
          toast.success(`Request number #${request_number} copied to clipboard!`); 
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          toast.error('Failed to copy request number'); 
        });
    }
  };
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
        timer > 0 ? <div className="mt-8 lg:mt-16 text-xs lg:text-xl md:text-lg sm:text-sm w-3/4">{t('copy')} <span className='text-custom-yellow cursor-pointer' onClick={handleCopy}>{localStorage.getItem('request_number')}</span> {t('and')} <Link href="/all-dances" className='text-custom-yellow'> {t('search-text')}</Link>  {t('timer')}</div> : <></>
      }
      </div>
      <div className='flex justify-center lg:mt-24 mt-8 mb-8'> <MainYellowButtons/></div>
      <div className='flex items-center justify-center mb-24'>
        <SongInput/>
      </div>
      {/* <SubHeader/> */}
      {/* <Carousel/> */}
    </div>
  )
}

export default Page
