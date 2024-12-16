import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";

const NotExistPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ALL_NAVIGATION_LINKS.home.path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: "80px",
          mb: 2,
        }}
      />
      <Typography variant="h4" sx={{ mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoBack}
        sx={{
          textTransform: "none",
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotExistPage;
