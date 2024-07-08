import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtistList from "./pages/ArtistList";
import AlbumList from "./pages/AlbumList";
import SongsList from "./pages/SongsList";

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
      </Routes>
    </Router>
  );
};

export default App;
