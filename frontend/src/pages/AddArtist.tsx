import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import api from "../services/api";

const AddArtist: React.FC = () => {
  const [name, setName] = useState("");
  const [albums, setAlbums] = useState([
    { title: "", description: "", songs: [{ title: "", length: "" }] },
  ]);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  const handleAddArtist = async () => {
    setValidationError(""); // Clear previous validation errors

    if (name.trim() === "") {
      setValidationError("Artist name is required.");
      return;
    }
    if (albums.length === 0 || albums[0].title.trim() === "") {
      setValidationError("At least one album with a title is required.");
      return;
    }
    for (let album of albums) {
      if (album.songs.length === 0 || album.songs[0].title.trim() === "") {
        setValidationError(
          "Each album must have at least one song with a title."
        );
        return;
      }
    }

    const newArtist = {
      name,
      albums,
    };

    try {
      await api.post("/artists", newArtist);
      navigate("/"); // Redirect to artist list after adding
    } catch (error) {
      console.error("Failed to add artist:", error);
    }
  };

  const handleAlbumChange = (index: number, field: string, value: string) => {
    const newAlbums = [...albums];
    newAlbums[index] = { ...newAlbums[index], [field]: value };
    setAlbums(newAlbums);
  };

  const handleSongChange = (
    albumIndex: number,
    songIndex: number,
    field: string,
    value: string
  ) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].songs[songIndex] = {
      ...newAlbums[albumIndex].songs[songIndex],
      [field]: value,
    };
    setAlbums(newAlbums);
  };

  const addAlbum = () => {
    setAlbums([
      ...albums,
      { title: "", description: "", songs: [{ title: "", length: "" }] },
    ]);
  };

  const removeAlbum = (index: number) => {
    const newAlbums = albums.filter((_, i) => i !== index);
    setAlbums(newAlbums);
  };

  const addSong = (albumIndex: number) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].songs.push({ title: "", length: "" });
    setAlbums(newAlbums);
  };

  const removeSong = (albumIndex: number, songIndex: number) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].songs = newAlbums[albumIndex].songs.filter(
      (_, i) => i !== songIndex
    );
    setAlbums(newAlbums);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        Add a new artist
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {validationError && (
            <Alert severity="warning" sx={{ marginBottom: "16px" }}>
              {validationError}
            </Alert>
          )}
          <div>
            <TextField
              label="Artist Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "16px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {albums.map((album, albumIndex) => (
              <Box key={albumIndex} sx={{ marginBottom: "16px" }}>
                <Typography variant="h6">Album {albumIndex + 1}</Typography>
                <TextField
                  label="Album Title"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "8px" }}
                  value={album.title}
                  onChange={(e) =>
                    handleAlbumChange(albumIndex, "title", e.target.value)
                  }
                />
                <TextField
                  label="Album Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ marginBottom: "8px" }}
                  value={album.description}
                  onChange={(e) =>
                    handleAlbumChange(albumIndex, "description", e.target.value)
                  }
                />
                {album.songs.map((song, songIndex) => (
                  <Box
                    key={songIndex}
                    sx={{ marginLeft: "16px", marginBottom: "8px" }}
                  >
                    <Typography variant="subtitle1">
                      Song {songIndex + 1}
                    </Typography>
                    <TextField
                      label="Song Title"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "8px" }}
                      value={song.title}
                      onChange={(e) =>
                        handleSongChange(
                          albumIndex,
                          songIndex,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      label="Song Length"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "8px" }}
                      value={song.length}
                      onChange={(e) =>
                        handleSongChange(
                          albumIndex,
                          songIndex,
                          "length",
                          e.target.value
                        )
                      }
                    />
                    <IconButton
                      onClick={() => removeSong(albumIndex, songIndex)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => addSong(albumIndex)}
                  sx={{
                    marginBottom: "8px",
                    color: "#FD9B63",
                    borderColor: "#FD9B63",
                  }}
                >
                  Add Song
                </Button>
                <Divider sx={{ marginBottom: "16px" }} />
                <IconButton onClick={() => removeAlbum(albumIndex)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addAlbum}
              sx={{
                marginBottom: "16px",
                color: "#FD9B63",
                borderColor: "#FD9B63",
              }}
            >
              Add Album
            </Button>
          </div>
          <Button
            variant="contained"
            sx={{ borderRadius: "10px", backgroundColor: "#FF8B01" }}
            onClick={handleAddArtist}
          >
            Add Artist
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default AddArtist;
