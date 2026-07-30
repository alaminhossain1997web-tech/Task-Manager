import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { useGetProfileQuery } from "./Services/api";
import Loader from "./components/ui/Loader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";
import ProjectDetails from "./pages/ProjectDetails";
import Registration from "./pages/Registration";
import UpdateProfile from "./pages/UpdateProfile";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // যদি লোকাল স্টোরেজে টোকেনই না থাকে, তবে ব্যাকএন্ডে কল দেওয়ার দরকারই নেই, সরাসরি লগইনে পাঠাবে
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpverify" element={<OtpVerify />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
