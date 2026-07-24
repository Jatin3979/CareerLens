import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import InterviewLayout from "./features/interview/layouts/InterviewLayout";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Contact from "./features/portfolio/pages/Contact"
import Resume from "./features/portfolio/pages/Resume";

// 👇 Import the ErrorPage (Adjust the path if you saved it somewhere else)
import ErrorPage from "./features/pages/Error"; 

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />, // Catches errors on the login page
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />, // Catches errors on the register page
  },
  {
    element: (
      <Protected>
        <InterviewLayout />
      </Protected>
    ),
    // 👇 This is the most important one! 
    // It catches 404s for any URL that doesn't exist, and any crashes inside your Home, Interview, or Contact pages.
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/interview/:interviewId",
        element: <Interview />,
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ],
  },
  {
    path: "/resume",
    element: <Protected><Resume /></Protected>, 
    errorElement: <ErrorPage />, // Catches errors on the resume page
  }
]);