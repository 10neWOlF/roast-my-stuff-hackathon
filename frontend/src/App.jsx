import "./App.css";
import "@fontsource/geist-sans"; // Defaults to weight 400
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import WorkFlow from "./pages/WorkFlow";
import Upload from "./pages/RoastMyStuff";
import RoastMyStuff from "./pages/RoastMyStuff";
import RoastResult from "./pages/RoastResult";
import RoastStuff from "./pages/RoastStuff";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LandingPage />
      </>
    ),
    errorElement: <PageNotFound />,
  },

  {
    path: "/upload",
    element: <RoastMyStuff />,
  },
  {
    path: "/result",
    element: <RoastResult />,
  },
  {
    path: "/example",
    element: <RoastStuff />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
