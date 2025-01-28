import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./Displayhome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {

  const {albumsData} = useContext(PlayerContext);

  const displayRef = useRef(); // Ref to access and style the display container
  const location = useLocation(); // Get the current route
  const isAlbum = location.pathname.includes("album"); // Check if we're on an album page
  const albumID = isAlbum ? location.pathname.split('/').pop(): ""; // Extract album ID from the URL
  const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x)=>(x._id === albumID)).bgcolour : "#121212" // Get album background color or default to black

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgColor}, #0D1B2A)` // Set a gradient for albums
        : `#0D1B2A`; // Default solid background for non-album pages
    }
  }, [isAlbum, bgColor]); // Re-run when `isAlbum` or `bgColor` changes

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0 transition-background duration-300 ease-in-out"
    >
      {albumsData.length > 0
      ?
      <Routes>
        <Route path="/" element={<DisplayHome />} /> {/* Home page */}
        <Route path="/album/:id" element={<DisplayAlbum album={albumsData.find((x)=>(x._id == albumID))} />} /> {/* Album page */}
      </Routes>
      : null
      }
      
    </div>
  );
};

export default Display;
