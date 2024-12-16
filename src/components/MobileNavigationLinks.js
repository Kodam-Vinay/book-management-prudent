import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import HamburgerContext from "../context/HamburgerContext";
import { Close as CloseIcon } from "@mui/icons-material";
import NavigationLinks from "./NavigationLinks";

const MobileNavigationLinks = ({ handleAddBook }) => {
  const { setHamburgerClicked } = useContext(HamburgerContext);

  const styles = {
    container: {
      display: {
        vxs: "flex",
        sm: "none",
      },
      flexDirection: "column",
      position: "fixed",
      top: 0,
      zIndex: 10,
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      opacity: 0.8,
      color: "white",
    },
    closeButton: {
      width: "40px",
      height: "40px",
      alignSelf: "flex-end",
    },
    closeIcon: {
      color: "red",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "rotate(90deg)",
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <IconButton
        aria-label="Close Navigation Menu"
        sx={styles.closeButton}
        onClick={() => setHamburgerClicked(false)}
      >
        <CloseIcon sx={styles.closeIcon} />
      </IconButton>
      <Box
        sx={{
          m: "auto",
        }}
      >
        <NavigationLinks handleAddBook={handleAddBook} />
      </Box>
    </Box>
  );
};

export default MobileNavigationLinks;
