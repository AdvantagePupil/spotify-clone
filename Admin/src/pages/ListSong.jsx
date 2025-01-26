import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const ListSong = () => {
  const [data, setData] = useState([]);

  // Function to fetch the list of songs from the API
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error('An Error Has Occurred.');
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`,{id});

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("An Erroe Has Occurred")
    }
  }

  // Fetch songs when the component mounts
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs</p>
      <br />
      <div>
        {/* Header row for larger screens */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1.5fr_1.5fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b className="text-center">Image</b>
          <b className="text-center">Name</b>
          <b className="text-center">Album</b>
          <b className="text-center">Duration</b>
          <b className="text-center">Action</b>
        </div>

        {/* Song list rows */}
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              {/* Image */}
              <img className="w-12 justify-self-center" src={item.image} alt="Song Cover" />

              {/* Name */}
              <p className="text-center">{item.name}</p>

              {/* Album */}
              <p className="text-center">{item.album}</p>

              {/* Duration */}
              <p className="text-center">{item.duration}</p>

              {/* Trash Icon */}
              <img
                onClick={()=>removeSong(item._id)}
                className="cursor-pointer "
                src={assets.trash_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListSong;
