import React, { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookDetails, setBookDetails] = useState({
    Title: "",
    AuthorName: "",
    GenreName: "",
    Pages: "",
    PublishedDate: "",
  });

  return (
    <BookContext.Provider value={{ bookDetails, setBookDetails }}>
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;
