import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth, pageWithNavbar, pageWithNavbarProfile } from "./routes";
import { Auth, NavbarTemplate, ProfileBalance } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: auth,
  },
  {
    path: "/",
    element: <ProfileBalance />,
    children: pageWithNavbarProfile,
  },
  {
    path: "/",
    element: <NavbarTemplate />,
    children: pageWithNavbar,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
