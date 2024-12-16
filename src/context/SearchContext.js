import { createContext, useState } from "react";

const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSearchClicked,
        setSearchClicked,
        selectedAuthor,
        selectedGenre,
        setSelectedAuthor,
        setSelectedGenre,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;
