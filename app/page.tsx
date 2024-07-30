import FBXViewer from '@/components/FBXModel'
import React from 'react'
import MainHeader from '@/components/MainHeader'
import SongInput from '@/components/SongInput'
import YellowButton from '@/components/YellowButton'
import MainYellowButtons from '@/components/MainYellowButtons'
import SubHeader from '@/components/SubHeader'
import ExampleCard from '@/components/ExampleCard'
import ExampleCardMain from '@/components/ExampleCardMain'
import Footer from '@/components/Footer'
import Carousel from '@/components/Carousel'

const page = () => {
  return (
    <div className='bg-custom-bg min-h-screen flex flex-col gap-4'>
      <MainHeader />
      <div className='flex justify-center mt-24 mb-8'> <MainYellowButtons/></div>
      <div className='flex items-center justify-center mb-24'>
        <SongInput />
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

export default page