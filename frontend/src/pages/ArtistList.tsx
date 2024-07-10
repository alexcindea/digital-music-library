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
  InputBase,
  Button,
} from "@mui/material";
import ArtistCard from "../components/ArtistCard";
import Background from "../components/Background";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";

export const InputBaseStyled = styled(InputBase)({
  width: "95%",
  marginLeft: "16px",
});

const TitleContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
`;

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
  const [artists, setArtists] = useState<any[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await api.get("/artists");
      setArtists(response.data);
      setFilteredArtists(response.data);

      console.log("Response:", response.data);
    };
    fetchArtists();
  }, []);

  const handleSearch = (event: any) => {
    console.log("event", event.target.value);

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

  return (
    <>
      <Background />
      <Container>
        <TitleContainer>
          <Typography variant="h4" gutterBottom sx={{ weight: "700" }}>
            Artists
          </Typography>

          <Button
            variant="contained"
            sx={{ borderRadius: "10px", backgroundColor: "#FF8B01" }}
          >
            Add Artist
          </Button>
        </TitleContainer>

        <Search>
          <InputBaseStyled
            placeholder="Search hive name..."
            onChange={handleSearch}
          />

          <SearchIconStyled />
        </Search>

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
