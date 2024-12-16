import { useContext, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import SearchContext from "../context/SearchContext";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ALL_NAVIGATION_LINKS, API_STATUS_LIST } from "../utils/constants";
import { ReusableButton } from "../utils/utilConstants";
import useGetData from "../hooks/useGetData";

const Home = () => {
  const navigate = useNavigate();

  const {
    searchQuery,
    setSearchQuery,
    setSearchClicked,
    selectedAuthor,
    selectedGenre,
    setSelectedAuthor,
    setSelectedGenre,
  } = useContext(SearchContext);

  const [data, setData] = useState({
    authors: [],
    genres: [],
  });

  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);

  const [errorMessage, setErrorMessage] = useState("");

  useGetData({
    setApiStatus,
    setData: (data) =>
      setData({
        authors: data?.authors,
        genres: data?.genres,
      }),
    setErrorMessage,
    isQuery: false,
  });

  const query = `?search_q=${searchQuery}&genre=${selectedGenre}&author=${selectedAuthor}`;
  const onSubmitSearch = (e) => {
    e.preventDefault();
    setSearchClicked(true);
    navigate(`${ALL_NAVIGATION_LINKS.searchResults.path}${query}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Search Books
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          p: 1,
          gap: 2,
        }}
        onSubmit={onSubmitSearch}
      >
        <OutlinedInput
          sx={{
            maxWidth: 400,
            width: "100%",
          }}
          endAdornment={
            <IconButton>
              <SearchIcon />
            </IconButton>
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a book...."
        />
        <TextField
          select
          label="Genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{
            maxWidth: 400,
            width: "100%",
          }}
        >
          {data?.genres?.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Author"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{
            maxWidth: 400,
            width: "100%",
          }}
        >
          {data?.authors?.map((author) => (
            <MenuItem key={author} value={author}>
              {author}
            </MenuItem>
          ))}
        </TextField>
        <ReusableButton
          children={<span>Search</span>}
          applyStyles={{
            maxWidth: 400,
            width: "100%",
          }}
          type="submit"
        />
      </Box>
    </Box>
  );
};

export default Home;
