import { Box, List, ListItemButton, MenuItem, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ReusableButton, validateForm } from "../utils/utilConstants";
import BookContext from "../context/BookContext";
import PopupContext from "../context/PopupContext";
import useGetData from "../hooks/useGetData";
import { API_STATUS_LIST } from "../utils/constants";

const AddUpdateForm = ({ handleSaveDetails }) => {
  const { bookDetails, setBookDetails } = useContext(BookContext);
  const { togglePopupOpen } = useContext(PopupContext);

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

  const handleSelectOption = (name, value) => {
    console.log(name, value);
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

      <Box
        sx={{
          position: "relative",
        }}
      >
        <TextField
          variant="outlined"
          value={bookDetails?.GenreName}
          onChange={(e) => handleChange("GenreName", e.target.value)}
          fullWidth
          placeholder="Genre Name"
          error={!!errors.GenreName}
          helperText={errors.GenreName}
        />
        <Box
          sx={{
            position: "absolute",
            background: "gray",
            width: "100%",
            borderRadius: 2,
            zIndex: 10,
          }}
        >
          {!bookDetails?.GenreName &&
            data?.genres?.map((genre) => (
              <MenuItem
                key={genre}
                value={genre}
                sx={{
                  ":hover": {
                    opacity: 0.9,
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleSelectOption("GenreName", genre)}
              >
                {genre}
              </MenuItem>
            ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          mt: 1,
        }}
      >
        <TextField
          variant="outlined"
          value={bookDetails?.AuthorName}
          onChange={(e) => handleChange("AuthorName", e.target.value)}
          fullWidth
          placeholder="Author Name"
          error={!!errors.AuthorName}
          helperText={errors.AuthorName}
        />
        <Box
          sx={{
            position: "absolute",
            background: "gray",
            width: "100%",
            borderRadius: 2,
            zIndex: 10,
          }}
        >
          {!bookDetails?.AuthorName &&
            data?.authors?.map((author) => (
              <MenuItem
                key={author}
                value={author}
                sx={{
                  ":hover": {
                    opacity: 0.9,
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleSelectOption("AuthorName", author)}
              >
                {author}
              </MenuItem>
            ))}
        </Box>
      </Box>

      <TextField
        variant="outlined"
        value={bookDetails?.GenreDescription}
        onChange={(e) => handleChange("GenreDescription", e.target.value)}
        fullWidth
        placeholder="Genre Description"
      />

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
