import { createContext, useState } from "react";

const HamburgerContext = createContext({});
export const HamburgerProvider = ({ children }) => {
  const [isHamburgerClicked, setHamburgerClicked] = useState(false);

  return (
    <HamburgerContext.Provider
      value={{
        isHamburgerClicked,
        setHamburgerClicked,
      }}
    >
      {children}
    </HamburgerContext.Provider>
  );
};
export default HamburgerContext;
