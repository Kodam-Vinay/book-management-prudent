import { Box, MenuItem, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ReusableButton, validateForm } from "../utils/utilConstants";
import BookContext from "../context/BookContext";
import PopupContext from "../context/PopupContext";
import useGetData from "../hooks/useGetData";
import { API_STATUS_LIST } from "../utils/constants";
import SearchContext from "../context/SearchContext";

const AddUpdateForm = ({ handleSaveDetails }) => {
  const { bookDetails, setBookDetails } = useContext(BookContext);
  const { togglePopupOpen } = useContext(PopupContext);
  const { setSelectedAuthor, setSelectedGenre } = useContext(SearchContext);

  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    Title: "",
    AuthorName: "",
    GenreName: "",
    Pages: "",
    PublishedDate: "",
  });

  const [data, setData] = useState({
    authors: [],
    genres: [],
  });

  const handleChange = (name, value) => {
    let error = "";
    if (name === "Pages" && !/^\d*$/.test(value)) {
      error = "Pages must be a numeric value.";
      return;
    } else if (name === "PublishedDate" && value === "") {
      error = "Published Date is required.";
    } else if (value.trim() === "") {
      error = `${name} is required.`;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    setBookDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm({ bookDetails, setErrors })) {
      handleSaveDetails(bookDetails); //here iam passing the bookDetails
    }
  };

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

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        variant="outlined"
        value={bookDetails?.Title}
        onChange={(e) => handleChange("Title", e.target.value)}
        fullWidth
        placeholder="Title"
        error={!!errors.Title}
        helperText={errors.Title}
      />
      <TextField
        select
        label="Genre"
        value={bookDetails?.GenreName}
        onChange={(e) => handleChange("GenreName", e.target.value)}
        fullWidth
        variant="outlined"
        sx={{
          width: "100%",
        }}
        error={!!errors.GenreName}
        helperText={errors.GenreName}
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
        value={bookDetails?.AuthorName}
        onChange={(e) => handleChange("AuthorName", e.target.value)}
        fullWidth
        variant="outlined"
        sx={{
          width: "100%",
        }}
        error={!!errors.AuthorName}
        helperText={errors.AuthorName}
      >
        {data?.authors?.map((author) => (
          <MenuItem key={author} value={author}>
            {author}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        variant="outlined"
        value={bookDetails?.Pages}
        onChange={(e) => handleChange("Pages", e.target.value)}
        fullWidth
        placeholder="Pages Count"
        error={!!errors.Pages}
        helperText={errors.Pages}
      />
      <TextField
        variant="outlined"
        type="date"
        value={bookDetails?.PublishedDate}
        onChange={(e) => handleChange("PublishedDate", e.target.value)}
        fullWidth
        placeholder="Published Date"
        error={!!errors.PublishedDate}
        helperText={errors.PublishedDate}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          alignSelf: "end",
        }}
      >
        <ReusableButton
          children={<span>Save</span>}
          handleClickButton={handleSubmit}
        />
        <ReusableButton
          children={<span>Cancel</span>}
          handleClickButton={() => togglePopupOpen(false)}
        />
      </Box>
    </Box>
  );
};

export default AddUpdateForm;
