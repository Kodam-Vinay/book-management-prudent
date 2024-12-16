import { createContext, useState } from "react";
import { ALL_POPUP_TYPES } from "../utils/constants";

const PopupContext = createContext();
export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(ALL_POPUP_TYPES.form);
  const [content, setContent] = useState({});
  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        togglePopupOpen: setIsPopupOpen,
        popupType,
        setPopupType,
        content,
        setContent,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContext;
