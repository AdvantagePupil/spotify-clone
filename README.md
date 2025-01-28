# Spotify Clone

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [How to Use](#how-to-use)
- [APIs Overview](#apis-overview)

## Overview
This Spotify Clone is a full-stack web application that mimics the core functionality of Spotify. Users can upload songs and albums, manage their library, and explore music collections. The application is built with a focus on scalability and maintainability.

## Features
- User authentication and session management
- Upload and manage songs and albums
- Browse music by albums and songs
- Add songs to playlists (coming soon)
- Responsive and user-friendly interface

## Technologies Used
### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (for file uploads)
- Cloudinary (for media storage)

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AdvantagePupil/spotify-clone.git
   cd spotify-clone
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PORT=5000
     ```

4. Start the application:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend
   npm start
   ```

5. Access the application in your browser at `http://localhost:3000`.

## How to Use
1. **Uploading Songs:** Navigate to the "Add Song" page, fill out the form with song details, and upload an audio file and an image.
2. **Browsing Songs:** Visit the "List Songs" page to view all uploaded songs, their albums, and durations.
3. **Deleting Songs:** Use the delete icon next to any song to remove it from the database.

## APIs Overview
### Song Management
- **Add Song**
  - **Endpoint:** `POST /api/song/add`
  - **Description:** Upload a song along with its metadata, image, and audio file.

- **List Songs**
  - **Endpoint:** `GET /api/song/list`
  - **Description:** Retrieve a list of all uploaded songs.

- **Remove Song**
  - **Endpoint:** `POST /api/song/remove`
  - **Description:** Delete a song by its ID.

### Album Management
- **List Albums**
  - **Endpoint:** `GET /api/album/list`
  - **Description:** Retrieve a list of all available albums.

---
Feel free to contribute to this project by submitting issues or pull requests. Thank you for exploring this Spotify Clone!

