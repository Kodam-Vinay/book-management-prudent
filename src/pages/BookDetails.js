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
  const { bookData: bookDetails } = state;
  const { togglePopupOpen, setPopupType, setContent } =
    useContext(PopupContext);
  const { setBookDetails, bookDetails: updatedBookData } =
    useContext(BookContext);

  const deleteBookFn = async () => {
    const res = await deleteRequest({
      bookId: bookDetails?.BookID,
      setApiStatus,
      setErrorMessage,
    });

    if (res?.status) {
      navigate(ALL_NAVIGATION_LINKS.home.path);
      togglePopupOpen(false);
    }
  };

  const handleDeleteBook = () => {
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
            handleClickButton={() => deleteBookFn()}
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

  const updateBookFun = async () => {
    const res = await putRequest({
      bookId: bookDetails?.BookID,
      requestData: updatedBookData,
      setApiStatus,
      setErrorMessage,
    });
    if (res?.status) {
      navigate(ALL_NAVIGATION_LINKS.home.path);
      togglePopupOpen(false);
    }
  };

  const handleEditBook = () => {
    togglePopupOpen(true);
    setPopupType(ALL_POPUP_TYPES.form);
    setContent({
      title: "Update Book Details",
      form: <AddUpdateForm handleSaveDetails={updateBookFun} />,
    });
    setBookDetails(bookDetails);
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
          alt={`${bookDetails?.Title}`}
          sx={{
            maxWidth: 120,
            maxHeight: 120,
            alignSelf: "center",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          {bookDetails?.Title}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Author:
        </Typography>

        <Typography>{bookDetails?.AuthorName}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Genre:
        </Typography>

        <Typography>{bookDetails?.GenreName}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Pages:
        </Typography>

        <Typography>{bookDetails?.Pages}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="textSecondary">
          Published Date:
        </Typography>

        <Typography>{bookDetails?.PublishedDate}</Typography>
      </Box>

      <Box
        sx={{
          alignSelf: "end",
          marginTop: "auto",
        }}
      >
        <IconButton color="primary" onClick={() => handleEditBook(bookDetails)}>
          <EditNoteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteBook(bookDetails?.BookID)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BookDetails;
