import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PeopleIcon from "@mui/icons-material/People";
import AlbumIcon from "@mui/icons-material/Album";
import { Column, Flex, Row } from "./utils";
import { Link } from "react-router-dom";

export const CardStyled = styled(Card)({
  minHeight: "236px",
  borderRadius: "10px",
  margin: "10px",
  boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.10);",
});

export const CardContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const CardImage = styled("img")({
  borderRadius: "10px",
  marginLeft: "16px",
  marginTop: "16px",
  height: "100px",
  width: "100px",
});

export const ArtistDetails = styled("div")({
  marginRight: "16px",
  marginTop: "16px",
  width: "60%",
});

export const DataContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  marginLeft: "16px",
  marginTop: "16px",
  justifyContent: "space-between",
});

export const DataDescription = styled("div")({
  fontSize: "16px",
  marginLeft: "8px",
});

export const DataValues = styled("div")({
  fontSize: "16px",
  marginRight: "16px",
});

export const ArtistName = styled("div")({
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "22px",
  marginLeft: "20px",
});

export const Body = styled("div")`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

interface ArtistCardProps {
  name: string;
  image: string;
  bio: string;
  albums: number;
  followers: number;
  popularity: number;
  link: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  image,
  bio,
  albums,
  followers,
  popularity,
  link,
}) => {
  console.log("Bio", bio);
  return (
    <Box
      component={Link}
      to={link}
      sx={{ textDecoration: "none", color: "inherit" }}
    >
      <CardStyled>
        <CardContainer>
          <CardImage src={image} alt={name} />
          <ArtistDetails>
            <ArtistName>{name}</ArtistName>
            <Body>{bio}</Body>
          </ArtistDetails>
        </CardContainer>
        <Column>
          <Row>
            <Flex>
              <AlbumIcon sx={{ color: "#A91D3A" }} />
              <DataDescription>Albums</DataDescription>
            </Flex>

            <DataValues>{albums}</DataValues>
          </Row>
          <Row>
            <Flex>
              <PeopleIcon sx={{ color: "#A91D3A" }} />
              <DataDescription>Followers</DataDescription>
            </Flex>
            <DataValues>{followers}</DataValues>
          </Row>
          <Row>
            <Flex>
              <PlayCircleIcon sx={{ color: "#A91D3A" }} />
              <DataDescription>Popularity</DataDescription>
            </Flex>
            <DataValues>{popularity}%</DataValues>
          </Row>
        </Column>
      </CardStyled>
    </Box>
  );
};

export default ArtistCard;
