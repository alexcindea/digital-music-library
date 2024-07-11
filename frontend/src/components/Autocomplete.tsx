import React, { useState } from "react";
import {
  InputBase,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const InputBaseStyled = styled(InputBase)({
  width: "95%",
  marginLeft: "16px",
});

const Search = styled("div")({
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

const SearchIconStyled = styled(SearchIcon)({
  color: "black",
  height: "50%",
  marginRight: "16px",
});

const SuggestionsContainer = styled(Paper)({
  marginTop: "10px",
  position: "absolute",
  width: "100%",
  zIndex: 1,
});

const ListItemStyled = styled(ListItem)({
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const Autocomplete: React.FC<{}> = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setInput(value);

    if (value.length > 1) {
      setLoading(true);
      try {
        const response = await api.get("artists/suggestions", {
          params: { query: value },
        });

        setSuggestions(response.data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    navigate(`/artists/${suggestion}/albums`);
  };

  return (
    <div style={{ position: "relative" }}>
      <Search>
        <InputBaseStyled
          placeholder="Search artist name..."
          value={input}
          onChange={handleInputChange}
        />
        <SearchIconStyled />
      </Search>
      {loading && <CircularProgress />}
      {suggestions.length > 0 && (
        <SuggestionsContainer>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItemStyled
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <ListItemText primary={suggestion} />
              </ListItemStyled>
            ))}
          </List>
        </SuggestionsContainer>
      )}
    </div>
  );
};

export default Autocomplete;
