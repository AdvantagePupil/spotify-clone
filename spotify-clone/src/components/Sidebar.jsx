import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-3 text-white hidden lg:flex'>
      <div className='bg-[#0D1B2A] h-[15%] rounded flex-col justify-around'>
        <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer mt-2'>
          <img className='w-6' src={assets.home_icon} alt="" />
          <p className='font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-3 pl-8 cursor-pointer mt-5'>
          <img className='w-6' src={assets.search_icon} alt="" />
          <p className='font-bold'>Search</p>
        </div>

      </div>
      <div className='bg-[#0D1B2A] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.stack_icon} alt="" />
            <p className='font-semibold'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
            <img className='w-5' src={assets.arrow_icon} alt="" />
            <img className='w-5' src={assets.plus_icon} alt="" />
          </div>
        </div>
        <div className='p-4 bg-[#2C3E50] m-2 rounded-lg font-semibold flex flex-col items-start gap-2'>
        <h1 className='text-lg text-white'>Create your first playlist</h1>
        <p className='font-light text-sm text-gray-300'>It's easy; we will help you</p>
        <button className='px-6 py-2 bg-white text-sm text-black rounded-full mt-1 hover:bg-gray-200 transition'>Create Playlist</button>
        </div>
        <div className='p-4 bg-[#2C3E50] m-2 rounded-lg font-semibold flex flex-col items-start gap-2 mt-4'>
        <h1 className='text-lg text-white'>Discover your next favorite podcasts—tailored just for you!</h1>
        <p className='font-light text-sm text-gray-300'>Time to dive into fresh episodes and uncover your next favorite!</p>
        <button className='px-6 py-2 bg-white text-sm text-black rounded-full mt-1 hover:bg-gray-200 transition'>Browse Podcasts</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar  