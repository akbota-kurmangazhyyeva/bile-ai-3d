import React from 'react'

const ExampleInfo = ({text}: {text: any}) => {
  return (
    <div className='bg-custom-red flex items-center justify-center p-4'>
        <h1 className="lg:text-4xl md:text-2xl sm:text-xl texl-lg text-custom-pink">{text}</h1>
    </div>
  )
}

export default ExampleInfo