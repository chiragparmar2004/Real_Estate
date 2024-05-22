import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Homepage from "./routes/Homepage/Homepage";
import Listpage from "./routes/Listpage/Listpage";
import Singlepage from "./routes/Singlepage/Singlepage";
import ProfilePage from "./routes/profilePage/profilePage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/ProfileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/list",
          element: <Listpage />,
        },
        {
          path: "/:id",
          element: <Singlepage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/profile",
      element: <RequireAuth />,
      children: [
        {
          path: "",
          element: <ProfilePage />,
        },
        {
          path: "update",
          element: <ProfileUpdatePage />,
        },
      ],
    },
    {
      path: "/post",
      element: <RequireAuth />,
      children: [
        {
          path: "add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
