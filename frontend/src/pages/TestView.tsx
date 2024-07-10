import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import ArtistCard from "../components/ArtistCard";

const artistsMock = [
  {
    id: "1",
    name: "Radiohead",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/2d5dbcf8431341a59e9847a9a8e7b250.png",
    bio: "Radiohead are an English rock band formed in Abingdon, Oxfordshire, in 1985.",
    albums: 2,
  },
  {
    id: "2",
    name: "Portishead",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/49d8c62b4b9b47e3b3b4a3a7693c7b9e.png",
    bio: "Portishead are an English band formed in 1991 in Bristol.",
    albums: 2,
  },
  {
    id: "3",
    name: "Taylor Swift",
    image:
      "https://lastfm.freetls.fastly.net/i/u/300x300/8d8f75bc4e224c9e9052a70f8a31325e.png",
    bio: "Taylor Alison Swift is an American singer-songwriter.",
    albums: 2,
  },
];

const TestView: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    // const fetchArtists = async () => {
    //   const response = await api.get("/artists");
    //   setArtists(response.data);
    //   console.log("Response:", response.data);
    // };
    // fetchArtists();
  }, []);

  return (
    <></>
    // <Container>
    //   <Grid container spacing={4}>
    //     {artistsMock.map((artist) => (
    //       <Grid item xs={12} sm={6} md={4} key={artist.id}>
    //         <ArtistCard
    //           name={artist.name}
    //           image={artist.image}
    //           bio={artist.bio}
    //           albums={artist.albums}
    //         />
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Container>
  );
};

export default TestView;
