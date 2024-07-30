import React from 'react'

const YellowButton = ({text}: {text: string}) => {
  return (
    <div className='bg-custom-yellow flex lg:text-4xl md:text-2xl sm:text-lg text-md md:p-2 p-1 items-center justify-center text-black'>{text}</div>
  )
}

export default YellowButton