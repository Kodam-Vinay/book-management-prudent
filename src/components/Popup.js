import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import { useContext } from "react";
import PopupContext from "../context/PopupContext";
import { Transition } from "../utils/muiConstants";
import { Close as CloseIcon } from "@mui/icons-material";
import { ALL_POPUP_TYPES } from "../utils/constants";

const Popup = () => {
  const { isPopupOpen, togglePopupOpen, popupType, content } =
    useContext(PopupContext);
  const handleClose = () => {
    togglePopupOpen(false);
  };

  return (
    <Dialog
      open={isPopupOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          margin: 1,
          width: "100%",
          maxWidth:
            popupType === ALL_POPUP_TYPES.confirmation ? "324px" : "450px",
          padding: 1,
          color: "black",
        },
      }}
    >
      {content?.title && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <DialogTitle
            sx={{
              flex: 1,
              padding: 0,
            }}
          >
            {content?.title}
          </DialogTitle>
          <IconButton
            onClick={handleClose}
            sx={{
              minWidth: "auto",
              padding: 0,
              margin: 0,
              height: 30,
              width: 30,
            }}
          >
            <CloseIcon
              sx={{
                color: "red",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "rotate(90deg)",
                },
              }}
            />
          </IconButton>
        </Box>
      )}

      {content?.form && content?.form}
    </Dialog>
  );
};

export default Popup;
