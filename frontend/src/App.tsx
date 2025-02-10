import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/auth/LoginPage";
import IsAuthenticated from "./layout/IsAuthenticated";
import IsUnAuthenticated from "./layout/IsUnAuthenticated";
import LandingPage from "./pages/LandingPage";



const router = createBrowserRouter([
  {
    path: "/home",
    element: <IsAuthenticated />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <IsUnAuthenticated />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
