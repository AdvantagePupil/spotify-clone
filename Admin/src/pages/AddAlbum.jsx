import React, { useState } from 'react'; // Import React and useState hook
import { assets } from '../assets/assets'; // Import assets for static resources
import { url } from '../App'; // Import API base URL
import { toast } from 'react-toastify'; // Import toast for notifications
import axios from 'axios'; // Import axios for API calls

const AddAlbum = () => {
  // State to store selected image file
  const [image, setImage] = useState(false); 
  // State to store selected background color
  const [color, setColor] = useState('#121212'); 
  // State to store album name
  const [name, setName] = useState(''); 
  // State to store album description
  const [desc, setDesc] = useState(''); 
  // State to track loading state
  const [loading, setLoading] = useState(false); 

  // Function to handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Set loading to true while API call is in progress
    try {
      const formData = new FormData(); // Create a new FormData object

      // Append form data
      formData.append('name', name); // Append album name
      formData.append('desc', desc); // Append album description
      formData.append('image', image); // Append selected image file
      formData.append('bgColor', color); // Append selected background color

      // Make POST request to the API to add the album
      const response = await axios.post(`${url}/api/album/add`, formData);

      // Handle API response
      if (response.data.success) {
        toast.success('Album Added!'); // Show success toast notification
        setDesc(""); // Reset album description
        setName(""); // Reset album name
        setImage(false); // Reset image
      } else {
        toast.error('Something Went Wrong!'); // Show error toast if API fails
      }
    } catch (error) {
      toast.error('An Error Has Occurred.'); // Handle any unexpected errors
    }
    setLoading(false); // Set loading back to false after API call
  };

  // Generate preview URL for the uploaded image or show default upload area
  const previewImage = image ? URL.createObjectURL(image) : assets.upload_area;

  return loading ? (
    // Display loading spinner while data is being submitted
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-black border-yellow-500 rounded-full animate-spin"></div>
    </div>
  ) : (
    // Form for adding a new album
    <form
      onSubmit={onSubmitHandler} // Attach submit handler
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      {/* Section for uploading an image */}
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])} // Update image state on file selection
          type="file"
          id="image"
          accept="image/*" // Restrict to image files
          hidden // Hide the default input
        />
        <label htmlFor="image">
          {/* Show preview image or upload area */}
          <img
            className="w-24 cursor-pointer"
            src={previewImage}
            alt="Upload Preview"
          />
        </label>
      </div>

      {/* Input for album name */}
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)} // Update name state on input
          value={name} // Bind input value to state
          className="bg-transparent outline-yellow-300 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
        />
      </div>

      {/* Input for album description */}
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)} // Update description state on input
          value={desc} // Bind input value to state
          className="bg-transparent outline-yellow-300 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
        />
      </div>

      {/* Input for selecting background color */}
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)} // Update color state on input
          value={color} // Bind input value to state
          type="color"
        />
      </div>

      {/* Submit button */}
      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
