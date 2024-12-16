import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavigationLinks from "./NavigationLinks";
import { useNavigate } from "react-router-dom";
import {
  ALL_NAVIGATION_LINKS,
  ALL_POPUP_TYPES,
  API_STATUS_LIST,
} from "../utils/constants";
import { ReusableButton } from "../utils/utilConstants";
import { useContext, useState } from "react";
import HamburgerContext from "../context/HamburgerContext";
import MobileNavigationLinks from "./MobileNavigationLinks";
import PopupContext from "../context/PopupContext";
import AddUpdateForm from "./AddUpdateForm";
import { postRequest } from "../api/apiCalls";

const Navbar = () => {
  const navigate = useNavigate();
  const { setHamburgerClicked, isHamburgerClicked } =
    useContext(HamburgerContext);
  const { togglePopupOpen, setPopupType, setContent } =
    useContext(PopupContext);

  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [errorMessage, setErrorMessage] = useState("");

  const addBookFun = async (bookData) => {
    const res = await postRequest({
      setApiStatus,
      setErrorMessage,
      requestData: bookData,
    });
    if (res?.status) {
      navigate(ALL_NAVIGATION_LINKS.home.path);
      togglePopupOpen(false);
    }
  };

  const handleAddBook = () => {
    togglePopupOpen(true);
    setPopupType(ALL_POPUP_TYPES.form);
    setContent({
      title: "Add Book Details",
      form: (
        <AddUpdateForm handleSaveDetails={(bookData) => addBookFun(bookData)} />
      ),
    });
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: {
          xs: "10vh",
          lg: "9vh",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className="inter-font"
    >
      <Toolbar>
        {/* logo */}
        <Typography
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate(ALL_NAVIGATION_LINKS.home.path)}
        >
          Book Store
        </Typography>
        <Box flexGrow={1} />
        <Box
          sx={{
            display: {
              vxs: "none",
              sm: "flex",
            },
          }}
        >
          <NavigationLinks handleAddBook={handleAddBook} />
        </Box>
        <ReusableButton
          children={<MenuIcon />}
          applyStyles={{
            display: {
              sm: "none",
            },
          }}
          handleClickButton={() => setHamburgerClicked(!isHamburgerClicked)}
        />
      </Toolbar>
      {isHamburgerClicked && (
        <MobileNavigationLinks handleAddBook={handleAddBook} />
      )}
    </AppBar>
  );
};

export default Navbar;
