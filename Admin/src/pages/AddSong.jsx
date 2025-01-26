import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets' // Import assets like images for uploading
import axios from 'axios';
import { url } from '../App'; // The base URL for API requests
import { toast } from 'react-toastify'; // For displaying toast notifications

const AddSong = () => {

  // State variables for form inputs and loading state
  const [image, setImage] = useState(false); // To store selected image file
  const [song, setSong] = useState(false); // To store selected audio file
  const [name, setName] = useState(""); // To store the song name
  const [desc, setDesc] = useState(""); // To store the song description
  const [album, setAlbum] = useState("none"); // To store the selected album
  const [loading, setLoading] = useState(false); // To track if the form is submitting
  const [albumData, setAlbumData] = useState([]); // Placeholder for album data (if needed)

  // Handle form submission
  const onSumbitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while submitting

    try {
      // Prepare FormData to send as multipart form data
      const formData = new FormData();
      formData.append('name', name); // Append song name to FormData
      formData.append('desc', desc); // Append song description
      formData.append('image', image); // Append selected image
      formData.append('audio', song); // Append selected audio file
      formData.append('album', album); // Append selected album

      // Send POST request to the server to add the song
      const response = await axios.post(`${url}/api/song/add`, formData);

      // Handle the response
      if (response.data.success) {
        toast.success("Song Added!"); // Show success message
        // Reset form fields after successful submission
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something Went Wrong."); // Show error message if failed
      }

    } catch (error) {
      toast.error("An Error Has Occurred."); // Handle network or server error
    }

    setLoading(false); // Set loading state to false after submission
  }

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setAlbumData(response.data.albums);
      }
      else {
        toast.error("Cannot Load Album Data.")
      }
    } catch (error) {
      toast.error("An Error Has Occurred.")
    }
  }

  useEffect(()=>{
    loadAlbumData();
  },[])

  // If the form is in a loading state, show a loading spinner
  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-black border-yellow-500 rounded-full animate-spin'></div>
    </div>
  ) : (
    // Render the form for adding a song
    <form onSubmit={onSumbitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

      {/* File input for uploading song */}
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload Song</p>
          <input onChange={(e) => setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
          <label htmlFor="song">
            <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>

        {/* File input for uploading image */}
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
      </div>

      {/* Input field for song name */}
      <div className='flex flex-col gap-2.5'>
        <p>Song Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent outline-yellow-300 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here!' type="text" required />
      </div>

      {/* Input field for song description */}
      <div className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent outline-yellow-300 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here!' type="text" required />
      </div>

      {/* Dropdown to select album */}
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e) => setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-yellow-300 border-2 border-gray-400 p-2.5 w-[150px]'>
          <option value="none">None</option>
          {albumData.map((item,index)=>(<option key={index} value={item.name}>{item.name}</option>))}
          {/* Populate album options dynamically if necessary */}
        </select>
      </div>

      {/* Submit button to add the song */}
      <button type="submit" className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>

    </form>
  )
}

export default AddSong;
