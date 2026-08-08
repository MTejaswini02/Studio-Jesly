import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Signup from "./pages/Signup";

import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";

import Login from "./pages/Login";

import Loader from "./components/Loader";

import ProtectedRoute from "./components/ProtectedRoute";
import ClientProtectedRoute from "./components/ClientProtectedRoute";


function App() {

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 700);


    return () => clearTimeout(timer);

  }, []);


  if (loading) {

    return <Loader />;

  }


  return (

    <Routes>


      {/* -------------------------------- */}
      {/* Public Website */}
      {/* -------------------------------- */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/services"
        element={<Services />}
      />

      <Route
        path="/portfolio"
        element={<Portfolio />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />


      {/* -------------------------------- */}
      {/* Admin Authentication */}
      {/* -------------------------------- */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* -------------------------------- */}
      {/* Admin Dashboard */}
      {/* -------------------------------- */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />


      {/* -------------------------------- */}
      {/* Client Authentication */}
      {/* -------------------------------- */}

      <Route
        path="/client/login"
        element={<ClientLogin />}
      />


      {/* -------------------------------- */}
      {/* Client Dashboard */}
      {/* -------------------------------- */}

      <Route
        path="/client"
        element={
          <ClientProtectedRoute>
            <ClientDashboard />
          </ClientProtectedRoute>
        }
      />


      {/* -------------------------------- */}
      {/* Signup */}
      {/* -------------------------------- */}

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* -------------------------------- */}
      {/* Login */}
      {/* -------------------------------- */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* -------------------------------- */}
      {/* 404 */}
      {/* -------------------------------- */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}


export default App;