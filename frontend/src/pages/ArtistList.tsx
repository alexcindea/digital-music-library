import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ArtistList: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await api.get("/artists");
      setArtists(response.data);
    };
    fetchArtists();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Artists
      </Typography>
      <List>
        {artists.map((artist) => (
          <ListItem
            key={artist._id}
            component={Link}
            to={`/artists/${artist.name}/albums`}
            button
          >
            <ListItemText primary={artist.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ArtistList;
