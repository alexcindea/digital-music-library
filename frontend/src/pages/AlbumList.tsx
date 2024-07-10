import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Albums by {name}
      </Typography>
      {albums.map((album) => (
        <Box key={album.title} sx={{ marginBottom: "40px" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <Box>
              <img
                src={album.image || "https://via.placeholder.com/200"} // Fallback if no image
                alt={album.title}
                style={{ width: "200px", borderRadius: "10px" }}
              />
            </Box>
            <Box sx={{ marginLeft: "20px" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {album.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {album.description}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <List>
            {album.songs.map((song, index) => (
              <ListItem key={index} sx={{ padding: "10px 0" }}>
                <Grid container alignItems="center">
                  <Grid item xs={1}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <ListItemText primary={song.title} />
                  </Grid>
                  <Grid item xs={1}>
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
