import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000';

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null); // Initial track is null
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [shuffleStatus, setShuffleStatus] = useState(false); // Shuffle state
  const [loopStatus, setLoopStatus] = useState(false); // Loop state
  const [volume, setVolume] = useState(1); // Volume state

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playwithID = async (id) => {
    // Find the song with the given _id
    const song = songsData.find(song => song._id === id);
    if (song) {
      setTrack(song); // Set the track to the selected song
      if (audioRef.current) {
        audioRef.current.src = song.file; // Dynamically set the audio source
        await audioRef.current.play(); // Play the song
        setPlayStatus(true); // Set play status to true
      }
    } else {
      console.error("Invalid song _id:", id);
    }
  };

  const next = async () => {
    let currentIndex = songsData.findIndex(song => song._id === track._id);
    let nextSong;
  
    if (shuffleStatus) {
      // If shuffle is enabled, pick a random song from the list
      const randomIndex = Math.floor(Math.random() * songsData.length);
      nextSong = songsData[randomIndex];
    } else if (currentIndex < songsData.length - 1) {
      nextSong = songsData[currentIndex + 1]; // Get the next song
    }
  
    if (nextSong) {
      setTrack(nextSong); // Update the track state
      audioRef.current.src = nextSong.file; // Update the audio source
      await audioRef.current.load(); // Ensure the audio is fully loaded
      audioRef.current.play(); // Play the next song
      setPlayStatus(true); // Set play status to true
    }
  };
  
  const previous = async () => {
    const currentIndex = songsData.findIndex(song => song._id === track._id);
    if (currentIndex > 0) {
      const prevSong = songsData[currentIndex - 1]; // Get the previous song
      setTrack(prevSong); // Update the track state
      audioRef.current.src = prevSong.file; // Update the audio source
      await audioRef.current.load(); // Ensure the audio is fully loaded
      audioRef.current.play(); // Play the previous song
      setPlayStatus(true); // Set play status to true
    }
  };

  const seekSong = async (e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]); // Set the first song as the initial track
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching albums data:", error);
    }
  };

  const toggleShuffle = () => {
    setShuffleStatus(prevStatus => !prevStatus);
  };

  const toggleLoop = () => {
    setLoopStatus(prevStatus => !prevStatus);
  };

  const changeVolume = (e) => {
    setVolume(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
    }
  };

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
        setTime({
          currentTime: {
            second: String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, "0"),
            minute: String(Math.floor(audioRef.current.currentTime / 60)).padStart(2, "0"),
          },
          totalTime: {
            second: String(Math.floor(audioRef.current.duration % 60)).padStart(2, "0"),
            minute: String(Math.floor(audioRef.current.duration / 60)).padStart(2, "0"),
          },
        });
      }
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [audioRef]);

  useEffect(() => {
    const fetchData = async () => {
      await getSongsData();
      await getAlbumsData();
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        if (loopStatus) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else {
          next(); // Proceed to next song
        }
      };
    }
  }, [loopStatus, shuffleStatus, track]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playwithID,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    shuffleStatus,
    loopStatus,
    toggleShuffle,
    toggleLoop,
    changeVolume,
    volume
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {loading ? <div>Loading...</div> : props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
