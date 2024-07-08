import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Params extends Record<string, string | undefined> {
  name: string;
}

const AlbumList: React.FC = () => {
  const { name } = useParams<Params>();
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await api.get(`/artists/${name}/albums`);

      console.log("Response:", response.data);
      setAlbums(response.data);
    };
    fetchAlbums();
  }, [name]);

  console.log("Albums:", albums);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Albums
      </Typography>
      <List>
        {albums.map((album) => (
          <ListItem
            key={album._id}
            component={Link}
            to={`/artists/${name}/albums/${album.title}/songs`}
          >
            <ListItemText primary={album.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AlbumList;
