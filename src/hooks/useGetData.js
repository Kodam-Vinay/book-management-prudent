import { useContext, useEffect } from "react";
import { getRequest } from "../api/apiCalls";
import SearchContext from "../context/SearchContext";
import { useSearchParams } from "react-router-dom";

const useGetData = ({
  setData,
  setApiStatus,
  setErrorMessage,
  isQuery = true,
}) => {
  const { isSearchClicked } = useContext(SearchContext);
  const [searchParams] = useSearchParams();

  const query = [
    searchParams.get("search_q")
      ? `search_q=${searchParams.get("search_q")}`
      : "",
    searchParams.get("author") ? `author=${searchParams.get("author")}` : "",
    searchParams.get("genre") ? `genre=${searchParams.get("genre")}` : "",
  ]
    .filter(Boolean)
    .join("&");

  useEffect(() => {
    getData();
  }, [isSearchClicked]);

  async function getData() {
    const res = await getRequest({
      setApiStatus,
      setErrorMessage,
      searchQuery: query,
      isQuery,
    });

    if (res?.status) {
      setData(res.data);
    }
  }
};

export default useGetData;
