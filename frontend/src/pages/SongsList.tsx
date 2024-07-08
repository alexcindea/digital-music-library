import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Params {
  [key: string]: string | undefined;
}

const SongList: React.FC = () => {
  const { name, title } = useParams<Params>();

  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await api.get(`/artists/${name}/albums/${title}/songs`);
      setSongs(response.data);
    };
    fetchSongs();
  }, [name, title]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Songs
      </Typography>
      <List>
        {songs.map((song) => (
          <ListItem key={song._id}>
            <ListItemText
              secondary={`Length: ${song.length}`}
              primary={song.title}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SongList;
