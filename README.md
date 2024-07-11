# **Digital Music Library**

This project is a digital music library where you can visualize artists and their albums, view album details and song lists, and search for artists using an autocomplete component. The application uses a Node.js backend with Express and MongoDB, and a React frontend with Material-UI for styling.

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Usage](#usage)

## **Features**

- List all artists and their albums
- View details of each album, including a description and list of songs
- Search for artists with an autocomplete component
- Add new artists and albums
- Delete artists and albums

## **Tech Stack**

**Frontend:**
- React
- TypeScript
- Material-UI

**Backend:**
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Spotify API for additional data

**Deployment:**
- Docker
- Docker Compose

## **Setup and Installation**

### **Prerequisites**

- Node.js
- Docker
- Docker Compose

### **Installation Steps**

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/digital-music-library.git
    cd digital-music-library
    ```

2. **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

3. **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    ```

4. **Environment Variables:**

    Create a `.env` file in the backend directory and add your MongoDB connection string and Spotify API credentials:

    ```env
    MONGO_URI=mongodb://db:27017/music-library
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    ```

    .env file will be provided by me in an email.

5. **Docker Setup:**

    To easily run, make sure Docker and Docker Compose are installed and running. You must still create a .env file like specified above.

    ```bash
    cd ..
    docker-compose up --build
    ```

    This will start the MongoDB, backend, and frontend containers.

6. **Import Data:**

    The data import script will automatically run when the backend container starts.

## **Usage**

Once the application is running, you can access it at `http://localhost:3000`. The backend API will be available at `http://localhost:5000`.


Contrib
