import { Box, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { ReusableButton, validateForm } from "../utils/utilConstants";
import BookContext from "../context/BookContext";
import PopupContext from "../context/PopupContext";

const AddUpdateForm = ({ handleSaveDetails }) => {
  const { bookDetails, setBookDetails } = useContext(BookContext);
  const { togglePopupOpen } = useContext(PopupContext);

  const [errors, setErrors] = useState({
    Title: "",
    AuthorName: "",
    GenreName: "",
    Pages: "",
    PublishedDate: "",
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
    setBookDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm({ bookDetails, setErrors })) {
      handleSaveDetails(); //here iam passing the bookDetails
    }
  };

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
        variant="outlined"
        value={bookDetails?.AuthorName}
        onChange={(e) => handleChange("AuthorName", e.target.value)}
        fullWidth
        placeholder="Author Name"
        error={!!errors.AuthorName}
        helperText={errors.AuthorName}
      />
      <TextField
        variant="outlined"
        value={bookDetails?.GenreName}
        onChange={(e) => handleChange("GenreName", e.target.value)}
        fullWidth
        placeholder="Genre Name"
        error={!!errors.GenreName}
        helperText={errors.GenreName}
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
