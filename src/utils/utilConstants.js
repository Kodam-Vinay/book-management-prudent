import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ALL_NAVIGATION_LINKS } from "./constants";

export const ReusableButton = ({
  children,
  handleClickButton,
  applyStyles,
  type = "button",
}) => (
  <Button
    onClick={handleClickButton}
    sx={{
      color: "white",
      backgroundColor: "primary.dark",
      border: "1px solid white",
      ":hover": {
        opacity: 0.8,
      },
      width: "fit-content",
      ...applyStyles,
    }}
    type={type}
  >
    {children}
  </Button>
);

export const renderError = ({ errorMessage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="error">
        {errorMessage}
      </Typography>
    </Box>
  );
};

export const renderLoader = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export const renderNoData = ({ bookCount, navigate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          color: "black",
          mt: 2,
        }}
      >
        {bookCount >= 2 ? "No Books Found" : "No Book Found"}
      </Typography>
      <ReusableButton
        children={<span>Go Back</span>}
        handleClickButton={() => navigate(ALL_NAVIGATION_LINKS.home.path)}
      />
    </Box>
  );
};

export const validateForm = ({ bookDetails, setErrors }) => {
  let isValid = true;
  const newErrors = {};

  if (!bookDetails?.Title?.trim()) {
    newErrors.Title = "Title is required.";
    isValid = false;
  }
  if (!bookDetails?.AuthorName?.trim()) {
    newErrors.AuthorName = "Author Name is required.";
    isValid = false;
  }
  if (!bookDetails?.GenreName?.trim()) {
    newErrors.GenreName = "Genre Name is required.";
    isValid = false;
  }
  if (!bookDetails?.Pages || !/^\d+$/.test(bookDetails.Pages)) {
    newErrors.Pages = "Pages must be a numeric value.";
    isValid = false;
  }
  if (!bookDetails?.PublishedDate?.trim()) {
    newErrors.PublishedDate = "Published Date is required.";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
