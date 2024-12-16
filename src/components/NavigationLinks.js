import { Box, Typography } from "@mui/material";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ReusableButton } from "../utils/utilConstants";
import { useContext } from "react";
import HamburgerContext from "../context/HamburgerContext";

const excludedNames = [
  ALL_NAVIGATION_LINKS.bookDetails.name,
  ALL_NAVIGATION_LINKS.searchResults.name,
];
const NavigationLinks = ({ handleAddBook }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isHamburgerClicked, setHamburgerClicked } =
    useContext(HamburgerContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          vxs: "column",
          sm: "row",
        },
        alignItems: "center",
        gap: 2,
      }}
    >
      {Object.values(ALL_NAVIGATION_LINKS)
        .filter((link) => !excludedNames.includes(link.name))
        .map((link) => (
          <Typography
            key={link.path}
            sx={{
              cursor: "pointer",
              opacity: link.path === pathname ? 0.7 : 1,
            }}
            onClick={() => {
              navigate(link.path);
              isHamburgerClicked && setHamburgerClicked(false);
            }}
          >
            {link.name}
          </Typography>
        ))}
      <ReusableButton
        children={<span>Add Book</span>}
        handleClickButton={() => {
          handleAddBook();
          isHamburgerClicked && setHamburgerClicked(false);
        }}
      />
    </Box>
  );
};

export default NavigationLinks;
