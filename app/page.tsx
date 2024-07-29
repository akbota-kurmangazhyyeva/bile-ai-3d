import FBXViewer from '@/components/FBXViewer'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen'>
        <FBXViewer url="https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/70b3bf12-d234-4f0c-8ef5-502d30502f16.fbx" />
    </div>
  )
}

export default page