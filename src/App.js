import { ThemeProvider } from "@emotion/react";
import AppRoutes from "./Routes/AppRoutes";
import { customTheme } from "./utils/muiConstants";
import "./App.css";
import { PopupProvider } from "./context/PopupContext";
import { SearchProvider } from "./context/SearchContext";
import { HamburgerProvider } from "./context/HamburgerContext";
import { BookProvider } from "./context/BookContext";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <PopupProvider>
        <SearchProvider>
          <HamburgerProvider>
            <BookProvider>
              <AppRoutes />
            </BookProvider>
          </HamburgerProvider>
        </SearchProvider>
      </PopupProvider>
    </ThemeProvider>
  );
}

export default App;
