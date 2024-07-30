import React from 'react'
import YellowButton from './YellowButton'

const MainYellowButtons = () => {
  return (
    <div className='flex flex-row w-3/4 gap-4' >
        <div className="w-1/3">
            <YellowButton text="WATCH QUEUE"></YellowButton>
        </div>
        <div className="w-2/3">
            <YellowButton text="SEARCH FOR A DANCE"></YellowButton>
        </div>
    </div>
  )
}

export default MainYellowButtons