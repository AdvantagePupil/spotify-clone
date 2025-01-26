import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'; // Ensure this import is correct

const ListAlbum = () => {
  // State to store album data
  const [data, setData] = useState([]);

  // Fetch albums from the API
  const fetchAlbums = async () => {
    try {
      // Make a GET request to fetch albums
      const response = await axios.get(`${url}/api/album/list`);

      // If the request is successful, set the album data
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      // If an error occurs, show a toast notification
      toast.error('An Error Has Occurred.');
    }
  };

  // Function to remove an album
  const removeAlbum = async (id) => {
    try {
      // Make a POST request to remove the album
      const response = await axios.post(`${url}/api/album/remove`, { id });

      // If the removal is successful, update the state and show a success message
      if (response.data.success) {
        toast.success('Album Removed!');
        // Remove the album from the UI by filtering it out
        setData((prevData) => prevData.filter((album) => album._id !== id));
      } else {
        // Show an error message if the removal fails
        toast.error('Failed to remove album.');
      }
    } catch (error) {
      // Handle any errors during the removal process
      toast.error('An Error Has Occurred.');
    }
  };

  // Fetch albums when the component is mounted
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-4">
      {/* Title for the album list */}
      <p className="text-xl font-semibold">All Albums</p>
      <br />
      <div>
        {/* Table header for album information */}
        <div className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1fr_0.45fr] items-center gap-4 p-3 border border-gray-300 text-sm bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>

        {/* Map over the album data to display each album */}
        {data.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-[0.5fr_1.5fr_1.5fr_1fr_0.5fr] items-center gap-4 p-3 border border-gray-300 text-sm">
              {/* Display album image */}
              <img className="w-12" src={item.image} alt={item.name} />

              {/* Display album name */}
              <p>{item.name}</p>

              {/* Display album description */}
              <p>{item.desc}</p>

              {/* Display album background color */}
              <input type="color" value={item.bgColor} disabled className="w-20 h-10 " />

              {/* Trash Icon for deleting an album */}
              <img
                onClick={() => removeAlbum(item._id)} // Call removeAlbum function on click
                className="cursor-pointer"
                src={assets.trash_icon} // Ensure this path is correct
                alt="Delete"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
