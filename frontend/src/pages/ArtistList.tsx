import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  InputBase,
  Button,
  CircularProgress,
} from "@mui/material";
import ArtistCard from "../components/ArtistCard";
import Background from "../components/Background";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "../components/Autocomplete";

export const InputBaseStyled = styled(InputBase)({
  width: "95%",
  marginLeft: "16px",
});

const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginBottom: "16px",
  marginTop: "16px",
});

export const Search = styled("div")({
  backgroundColor: "white",
  width: "100%",
  height: "56px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #09302B",
  borderColor: "#09302B",
});

export const SearchIconStyled = styled(SearchIcon)({
  color: "black",
  height: "50%",
  marginRight: "16px",
});

const ArtistList: React.FC = () => {
  const navigate = useNavigate();

  const [artists, setArtists] = useState<any[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/artists");
        setArtists(response.data);
        setFilteredArtists(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const handleSearch = (event: any) => {
    //console.log(event.target.value);
    if (event.target.value === "") {
      setFilteredArtists(artists);
    } else {
      setFilteredArtists(
        artists.filter((artist) =>
          artist.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
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
    <>
      <Background />
      <Container sx={{ marginBottom: "20px" }}>
        <TitleContainer>
          <div></div>
          <Typography variant="h4" gutterBottom sx={{ weight: "700" }}>
            Artists
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: "10px", backgroundColor: "#FF8B01" }}
            onClick={() => navigate("/add-artist")}
          >
            Add Artist
          </Button>
        </TitleContainer>
        <Autocomplete />
        <Grid container spacing={4} sx={{ marginTop: "20px" }}>
          {filteredArtists.map((artist) => (
            <Grid item xs={12} sm={6} md={4} key={artist.id}>
              <ArtistCard
                name={artist.name}
                image={artist.image}
                bio={artist.bio}
                albums={artist.albums.length}
                followers={artist.followers.total}
                popularity={artist.popularity}
                link={`/artists/${artist.name}/albums`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ArtistList;
