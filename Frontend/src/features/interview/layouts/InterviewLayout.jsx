// features/interview/components/InterviewLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function InterviewLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}