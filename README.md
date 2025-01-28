Spotify Clone Project

Overview

This project is a Spotify-inspired web application that allows users to listen to music, create playlists, and manage their music library. The application is built using a modern tech stack and includes both frontend and backend functionality. While inspired by Spotify, this clone uses custom APIs and a MongoDB database to manage user data and media files.

Features

Core Functionality

User Authentication: Secure user login and signup functionality.

Music Playback: Stream music directly within the app.

Playlist Management: Create, update, and delete playlists.

Music Library: View and manage your collection of songs and albums.

Dynamic Content: Display album art, song details, and durations.

Future Enhancements

Search Functionality: Add the ability to search for songs, albums, and artists.

Podcast Navigation: Implement navigation and playback for podcasts.

User Activity Tracking: Show recently played tracks and other user activities.

Improved Playlist Features: Enable reordering songs and collaborative playlists.

Tech Stack

Frontend

React: For building the user interface.

Tailwind CSS: For styling the application.

React Router: For navigation between pages.

Backend

Node.js: For server-side logic.

Express: For handling API requests and routing.

MongoDB: For storing user data, playlists, and song metadata.

Additional Tools

Multer: For handling file uploads (e.g., song files and album images).

Cloudinary: For storing and retrieving media files (audio and images).

Setup and Installation

Prerequisites

Node.js installed on your system.

MongoDB Atlas or a local MongoDB instance.

A Cloudinary account for media storage.

Installation Steps

Clone the repository:

git clone https://github.com/AdvantagePupil/spotify-clone.git

Navigate to the project directory:

cd spotify-clone

Install dependencies:

npm install

Set up environment variables by creating a .env file:

MONGO_URI=your-mongodb-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

Start the backend server:

npm run server

Start the frontend development server:

npm start

Project Architecture

Directory Structure

spotify-clone/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
├── .env
├── package.json
└── README.md

Key Files

Backend:

middleware/upload.js: Handles file uploads using Multer.

controllers/songController.js: Manages song-related operations, such as adding and listing songs.

models/songModel.js: Defines the schema for storing song data in MongoDB.

Frontend:

src/components: Contains reusable UI components like the navbar and song cards.

src/pages: Defines the main pages of the application (e.g., home, library, playlists).

APIs

Endpoints

POST /api/songs/add: Add a new song with audio and image uploads.

GET /api/songs/list: Retrieve a list of all songs.

DELETE /api/songs/remove: Remove a song by ID.

Sample Request

Add a Song

POST /api/songs/add
Content-Type: multipart/form-data

{
  "name": "Song Name",
  "desc": "Description of the song",
  "album": "Album Name",
  "audio": [Audio File],
  "image": [Image File]
}

Lessons Learned

Challenges Faced:

Handling file uploads and integrating with Cloudinary.

Calculating song duration dynamically.

Solutions Implemented:

Used Multer for seamless file handling.

Leveraged Cloudinary’s API to upload and manage media files efficiently.

Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests.

License

This project is licensed under the MIT License.

Contact

For questions or suggestions, reach out to:

GitHub: AdvantagePupil

Email: ahmadghaleb17@gmail.com

