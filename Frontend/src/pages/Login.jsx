import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  googleLogin,
} from "../api/authApi";

import { getCurrentUser } from "../utils/auth";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // -----------------------------------------
  // Email + Password Login
  // -----------------------------------------

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please enter your email and password.");

      return;
    }

    try {

      const response = await loginUser(
        email,
        password
      );

      const token =
        response.data.access_token;

      localStorage.setItem(
        "access_token",
        token
      );


      const user = getCurrentUser();


      if (
        user?.role?.toLowerCase() ===
        "admin"
      ) {

        navigate("/admin");

        return;
      }


      if (
        user?.role?.toLowerCase() ===
        "client"
      ) {

        navigate("/client");

        return;
      }


      localStorage.removeItem(
        "access_token"
      );

      alert(
        "Your account does not have a valid role."
      );

    } catch (error) {

      console.error(
        "Login failed:",
        error
      );

      alert(
        "Invalid email or password."
      );

    }

  };


  // -----------------------------------------
  // Google Login
  // -----------------------------------------

  const handleGoogleLogin = async (
    response
  ) => {

    try {

      const result =
        await googleLogin(
          response.credential
        );


      const token =
        result.data.access_token;


      localStorage.setItem(
        "access_token",
        token
      );


      const user =
        getCurrentUser();


      if (
        user?.role?.toLowerCase() ===
        "admin"
      ) {

        navigate("/admin");

        return;
      }


      if (
        user?.role?.toLowerCase() ===
        "client"
      ) {

        navigate("/client");

        return;
      }


      localStorage.removeItem(
        "access_token"
      );

      alert(
        "Your account does not have a valid role."
      );

    } catch (error) {

      console.error(
        "Google login failed:",
        error
      );

      alert(
        "Google login failed."
      );

    }

  };


  // -----------------------------------------
  // Google Identity Services
  // -----------------------------------------

  useEffect(() => {

    const initializeGoogleLogin = () => {

      if (!window.google) {
        return;
      }


      window.google.accounts.id.initialize({

        client_id:
          import.meta.env
            .VITE_GOOGLE_CLIENT_ID,

        callback:
          handleGoogleLogin,

      });


      const button =
        document.getElementById(
          "google-login-button"
        );


      if (button) {

        button.innerHTML = "";

        window.google.accounts.id.renderButton(
          button,
          {
            theme: "outline",
            size: "large",
            width: 340,
            text: "continue_with",
          }
        );

      }

    };


    if (!window.google) {

      const script =
        document.createElement("script");

      script.src =
        "https://accounts.google.com/gsi/client";

      script.async = true;
      script.defer = true;

      script.onload =
        initializeGoogleLogin;

      document.body.appendChild(
        script
      );


      return () => {

        document.body.removeChild(
          script
        );

      };

    } else {

      initializeGoogleLogin();

    }

  }, []);


  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (

    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">

      <div className="bg-[#161B22] p-10 rounded-xl w-[420px]">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Studio Jesly
        </h1>


        <p className="text-gray-400 text-center mb-8">
          Welcome Back
        </p>


        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-4 border border-zinc-700"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        {/* Password */}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-6 border border-zinc-700"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        {/* Login */}

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-semibold"
        >
          Login
        </button>


        {/* Divider */}

        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-px bg-zinc-700" />

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-zinc-700" />

        </div>


        {/* Google */}

        <div
          id="google-login-button"
          className="flex justify-center"
        />


        {/* Signup */}

        <p className="text-gray-400 text-center mt-6">

          Don't have an account?{" "}

          <button
            onClick={() =>
              navigate("/signup")
            }
            className="text-yellow-400 hover:text-yellow-300"
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>

  );

}


export default Login;