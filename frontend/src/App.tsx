import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtistList from "./pages/ArtistList";
import AlbumList from "./pages/AlbumList";
import SongsList from "./pages/SongsList";
import TestView from "./pages/TestView";
import AddArtist from "./pages/AddArtist";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtistList />} />
        <Route path="/artists/:name/albums" element={<AlbumList />} />
        <Route
          path="/artists/:name/albums/:title/songs"
          element={<SongsList />}
        />
        <Route path="/test" element={<TestView />} />
        <Route path="/add-artist" element={<AddArtist />} />
      </Routes>
    </Router>
  );
};

export default App;
