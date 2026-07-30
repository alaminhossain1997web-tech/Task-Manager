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
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error?.status !== 401) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error?.data?.message || "Unable to verify your session. Please try again."}
      </div>
    );
  }

  if (isError || !profile) {
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
