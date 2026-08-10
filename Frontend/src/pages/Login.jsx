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
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-[440px]">

        {/* Brand */}

        <div className="text-center mb-8">

          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold tracking-tight text-white"
          >
            studio{" "}
            <span className="text-yellow-500">
              jesly
            </span>
          </button>

          <p className="text-zinc-400 mt-3">
            Welcome back
          </p>

        </div>


        {/* Login Card */}

        <div className="bg-[#161B22] border border-zinc-800 rounded-3xl p-7 sm:p-10">

          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Login to continue your project.
          </p>


          {/* Email */}

          <div className="mb-5">

            <label className="block text-sm text-zinc-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3.5 rounded-xl bg-[#0D1117] text-white placeholder:text-zinc-600 border border-zinc-700 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* Password */}

          <div className="mb-7">

            <label className="block text-sm text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3.5 rounded-xl bg-[#0D1117] text-white placeholder:text-zinc-600 border border-zinc-700 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* Login */}

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >
            Login
          </button>


          {/* Divider */}

          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-zinc-800" />

            <span className="text-zinc-500 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-zinc-800" />

          </div>


          {/* Google Login */}

          <div
            id="google-login-button"
            className="flex justify-center w-full overflow-hidden"
          />


          {/* Signup */}

          <p className="text-zinc-400 text-center mt-7 text-sm">

            Don't have an account?{" "}

            <button
              onClick={() =>
                navigate("/signup")
              }
              className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
            >
              Sign Up
            </button>

          </p>

        </div>


        {/* Back to website */}

        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-6 text-sm text-zinc-500 hover:text-yellow-500 transition-colors"
        >
          ← Back to Studio Jesly
        </button>

      </div>

    </div>
  );
}

export default Login;