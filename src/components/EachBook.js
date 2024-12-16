import { Box, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ALL_NAVIGATION_LINKS, STATIC_IMAGE_URL } from "../utils/constants";

const EachBook = ({ bookData }) => {
  const navigate = useNavigate();

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
        width: "320px",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(
          ALL_NAVIGATION_LINKS.bookDetails.path + "/" + bookData?.BookID,
          {
            state: { bookData: bookData },
          }
        )
      }
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
          {bookData.Title}
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
    </Box>
  );
};

export default EachBook;
