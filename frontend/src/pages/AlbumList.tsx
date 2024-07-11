import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material";
import api from "../services/api";

interface Song {
  title: string;
  length: string;
}

interface Album {
  title: string;
  description: string;
  songs: Song[];
  image: string;
}

interface Params extends Record<string, string | undefined> {
  name: string;
}

const AlbumList: React.FC = () => {
  const { name } = useParams<Params>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get(`/artists/${name}/albums`);
        setAlbums(response.data);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [name]);

  const deleteArtist = async () => {
    try {
      await api.delete(`/artists/${name}`);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete artist:", error);
    }
  };

  const deleteAlbum = async (albumTitle: string) => {
    try {
      await api.delete(`/artists/${name}/albums/${albumTitle}`);
      setAlbums(albums.filter((album) => album.title !== albumTitle));
    } catch (error) {
      console.error("Failed to delete album:", error);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ backgroundColor: "#FFF6E9" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ marginTop: "5%", marginBottom: "5%" }}
        >
          Albums by {name}
        </Typography>
        <Button
          variant="contained"
          onClick={deleteArtist}
          sx={{
            backgroundColor: "#973131",
            borderRadius: "10px",
            height: "40px",
          }}
        >
          Delete Artist
        </Button>
      </div>
      {albums.map((album) => (
        <Box key={album.title} sx={{ marginBottom: "40px" }}>
          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={4}>
              <img
                src={album.image || "https://via.placeholder.com/200"} // Fallback if no image
                alt={album.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {album.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {album.description}
              </Typography>
              <Button
                variant="contained"
                onClick={() => deleteAlbum(album.title)}
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#EB5B00",
                  borderRadius: "10px",
                }}
              >
                Delete Album
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <List>
            {album.songs.map((song, index) => (
              <ListItem key={index} sx={{ padding: "10px 0" }}>
                <Grid container alignItems="center">
                  <Grid item xs={2} sm={1}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={8} sm={10}>
                    <ListItemText primary={song.title} />
                  </Grid>
                  <Grid item xs={2} sm={1}>
                    <Typography>{song.length}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Container>
  );
};

export default AlbumList;
