import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "../components/Body";
import { ALL_NAVIGATION_LINKS } from "../utils/constants";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import SearchResults from "../pages/SearchResults";
import BookDetails from "../pages/BookDetails";
import NotExistPage from "../pages/NotExistPage";

const AppRoutes = () => {
  const router = createBrowserRouter(
    [
      {
        path: "",
        element: <Body />,
        errorElement: <NotExistPage />,
        children: [
          {
            path: ALL_NAVIGATION_LINKS.home.path,
            element: <Home />,
          },
          {
            path: ALL_NAVIGATION_LINKS.contact.path,
            element: <Contact />,
          },
          {
            path: ALL_NAVIGATION_LINKS.about.path,
            element: <About />,
          },
          {
            path: ALL_NAVIGATION_LINKS.searchResults.path,
            element: <SearchResults />,
          },
          {
            path: ALL_NAVIGATION_LINKS.bookDetails.path + "/:id",
            element: <BookDetails />,
          },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;
