import React from 'react'
import { assets } from '../assets/assets' // Import assets like icons and logos
import { NavLink } from 'react-router-dom' // Import NavLink from react-router-dom for navigation

const Sidebar = () => {
  return (
    <div className='bg-[#FFD700] min-h-screen pl-[4vw]'>
      {/* Logo displayed for larger screens (sm and above) */}
      <img src={assets.logo} className='mt-5 w-[max(10vw,100px)] hidden sm:block' alt="" />
      
      {/* Small logo displayed for smaller screens (below sm) */}
      <img src={assets.logo_small} className='mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block' alt="" />

      <div className='flex flex-col gap-5 mt-10'> {/* Container for the navigation links */}

        {/* Navigation link for 'Add Song' */}
        <NavLink to='/add-song' className='flex items-center gap-2.5 text bg-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#FAEBD7] text-sm font-medium'>
          {/* Icon for Add Song */}
          <img src={assets.add_song} className='w-5' alt="" />
          {/* Text for Add Song, hidden on small screens */}
          <p className='hidden sm:block'>Add Song</p>
        </NavLink>

        {/* Navigation link for 'List Song' */}
        <NavLink to='/list-song' className='flex items-center gap-2.5 text bg-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#FAEBD7] text-sm font-medium'>
          {/* Icon for List Song */}
          <img src={assets.song_icon} className='w-5' alt="" />
          {/* Text for List Song, hidden on small screens */}
          <p className='hidden sm:block'>List Song</p>
        </NavLink>

        {/* Navigation link for 'Add Album' */}
        <NavLink to='/add-album' className='flex items-center gap-2.5 text bg-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#FAEBD7] text-sm font-medium'>
          {/* Icon for Add Album */}
          <img src={assets.add_album} className='w-5' alt="" />
          {/* Text for Add Album, hidden on small screens */}
          <p className='hidden sm:block'>Add Album</p>
        </NavLink>

        {/* Navigation link for 'List Album' */}
        <NavLink to='/list-album' className='flex items-center gap-2.5 text bg-gray-800 bg-white border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#FAEBD7] text-sm font-medium'>
          {/* Icon for List Album */}
          <img src={assets.album_icon} className='w-5' alt="" />
          {/* Text for List Album, hidden on small screens */}
          <p className='hidden sm:block'>List Album</p>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar;
