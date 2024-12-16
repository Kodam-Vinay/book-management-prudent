import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import "../App.css";
import Popup from "./Popup";
import { useContext } from "react";
import PopupContext from "../context/PopupContext";

const Body = () => {
  const { isPopupOpen } = useContext(PopupContext);
  return (
    <>
      {isPopupOpen && <Popup />}
      <Navbar />
      <Box
        sx={{
          height: {
            xs: "90vh",
            lg: "91vh",
          },
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Body;
