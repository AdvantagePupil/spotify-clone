import React, { useContext, useEffect, useState } from 'react';
import Navbar from './NavBar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {

  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playwithID, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    // Find album data from the albumsData array
    const album = albumsData.find((item) => item._id === id);
    if (album) {
      setAlbumData(album);
    }
  }, [albumsData, id]);

  // Filter songs that belong to the current album
  const albumSongs = songsData.filter((item) => item.album === albumData.name);

  // Calculate total duration of the album
  const totalDuration = albumSongs.reduce((acc, song) => {
    const [minutes, seconds] = song.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  // Convert total duration back to MM:SS format
  const totalMinutes = Math.floor(totalDuration / 60); // Total minutes
  const totalSeconds = totalDuration % 60; // Remaining seconds
  const formattedDuration = `${totalMinutes}min ${totalSeconds}sec`;

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-10 h-10" src={assets.logo_small} alt="" />
            <b className="mr-1">Harp</b>
            • {albumSongs.length} Songs
            • <b className="mr-1">{formattedDuration}</b>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {albumSongs.map((item, index) => (
        <div
          onClick={() => playwithID(item._id)}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  ) : null;
};

export default DisplayAlbum;
