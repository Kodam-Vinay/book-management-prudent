import { useState } from "react";
import { API_STATUS_LIST } from "../utils/constants";
import useGetData from "../hooks/useGetData";
import { Box } from "@mui/material";
import {
  renderError,
  renderLoader,
  renderNoData,
} from "../utils/utilConstants";
import EachBook from "../components/EachBook";
import { deleteRequest, putRequest } from "../api/apiCalls";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(API_STATUS_LIST.initial);
  const [booksData, setBooksData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useGetData({
    setApiStatus,
    setData: (data) => setBooksData(data?.books),
    setErrorMessage,
    isQuery: true,
  });

  const handleDeleteBook = async (bookId) => {
    await deleteRequest({
      bookId,
      setApiStatus,
      setErrorMessage,
    });
  };

  const handleUpdateBook = async (bookDetails) => {
    await putRequest({
      bookId: bookDetails?.BookID,
      setApiStatus,
      setErrorMessage,
      requestData: {},
    });
  };

  const renderSuccess = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
        {booksData?.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: {
                vxs: "center",
                sm: "start",
              },
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {booksData?.map((eachBook) => (
              <EachBook
                key={eachBook?.BookID}
                bookData={eachBook}
                onDelete={handleDeleteBook}
                onSave={handleUpdateBook}
              />
            ))}
          </Box>
        ) : (
          renderNoData({ bookCount: 2, navigate })
        )}
      </Box>
    );
  };

  const renderResults = () => {
    switch (apiStatus) {
      case API_STATUS_LIST.success:
        return renderSuccess();
      case API_STATUS_LIST.loading:
        return renderLoader();
      case API_STATUS_LIST.error:
        return renderError({ errorMessage });

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderResults()}
      </Box>
    </Box>
  );
};

export default SearchResults;
