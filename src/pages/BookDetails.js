import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useContext, useState } from "react";
import {
  ALL_NAVIGATION_LINKS,
  ALL_POPUP_TYPES,
  API_STATUS_LIST,
  STATIC_IMAGE_URL,
} from "../utils/constants";
import PopupContext from "../context/PopupContext";
import { ReusableButton } from "../utils/utilConstants";
import { deleteRequest, putRequest } from "../api/apiCalls";
import AddUpdateForm from "../components/AddUpdateForm";
import BookContext from "../context/BookContext";

const BookDetails = () => {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [errorMessage, setErrorMessage] = useState("");
  const { state } = useLocation();
  const { bookData } = state;
  const { togglePopupOpen, setPopupType, setContent } =
    useContext(PopupContext);
  const { setBookDetails } = useContext(BookContext);

  const deleteBookFn = async (bookId) => {
    const res = await deleteRequest({
      bookId,
      setApiStatus,
      setErrorMessage,
    });

    if (res?.status) {
      navigate(ALL_NAVIGATION_LINKS.home.path);
      togglePopupOpen(false);
    }
  };

  const handleDeleteBook = (bookId) => {
    togglePopupOpen(true);
    setPopupType(ALL_POPUP_TYPES.confirmation);
    setContent({
      title: "Are you sure you want to delete this book?",
      form: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignSelf: "end",
            gap: 1,
          }}
        >
          <ReusableButton
            children={<span>Confirm</span>}
            applyStyles={{
              backgroundColor: "green",
            }}
            handleClickButton={() => deleteBookFn(bookId)}
          />
          <ReusableButton
            children={<span>Cancel</span>}
            applyStyles={{
              backgroundColor: "red",
            }}
            handleClickButton={() => togglePopupOpen(false)}
          />
        </Box>
      ),
    });
  };

  const updateBookFun = async (updatedBookData) => {
    const res = await putRequest({
      bookId: updatedBookData?.BookID,
      requestData: {
        Title: updatedBookData?.Title,
        Pages: updatedBookData?.Pages,
        PublishedDate: updatedBookData?.PublishedDate,
        AuthorID: updatedBookData?.AuthorID,
        GenreID: updatedBookData?.GenreID,
      },
      setApiStatus,
      setErrorMessage,
    });

    if (res?.status) {
      setBookDetails(updatedBookData); // Update context with the new details
      togglePopupOpen(false);
      navigate(ALL_NAVIGATION_LINKS.home.path);
    }
  };

  const handleEditBook = (bookData) => {
    setBookDetails(bookData);
    togglePopupOpen(true);
    setPopupType(ALL_POPUP_TYPES.form);
    setContent({
      title: "Update Book Details",
      form: (
        <AddUpdateForm
          handleSaveDetails={(details) => updateBookFun(details)}
        />
      ),
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        color: "black",
        maxWidth: "350px",
        margin: "auto",
        marginTop: 3,
        height: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={STATIC_IMAGE_URL}
          alt={`${bookData?.Title}`}
          sx={{
            maxWidth: 120,
            maxHeight: 120,
            alignSelf: "center",
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          {bookData?.Title}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Author:
        </Typography>

        <Typography>{bookData?.AuthorName}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Genre:
        </Typography>

        <Typography>{bookData?.GenreName}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Pages:
        </Typography>

        <Typography>{bookData?.Pages}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Published Date:
        </Typography>

        <Typography>{bookData?.PublishedDate}</Typography>
      </Box>

      <Box
        sx={{
          alignSelf: "end",
          marginTop: "auto",
        }}
      >
        <IconButton color="primary" onClick={() => handleEditBook(bookData)}>
          <EditNoteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteBook(bookData?.BookID)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BookDetails;
