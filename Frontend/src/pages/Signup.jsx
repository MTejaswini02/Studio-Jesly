import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signupUser,
  googleSignup,
} from "../api/authApi";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // -----------------------------------------
  // Email + Password Signup
  // -----------------------------------------

  const handleSignup = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    try {
      await signupUser({
        full_name: fullName,
        email: email,
        password: password,
      });

      alert(
        "Account created successfully. Please login."
      );

      navigate("/login");

    } catch (error) {
      console.error("Signup failed:", error);

      const message =
        error?.response?.data?.detail ||
        "Unable to create account.";

      alert(message);
    }
  };

  // -----------------------------------------
  // Google Signup
  // -----------------------------------------

  const handleGoogleSignup = async (response) => {
    try {
      const result = await googleSignup(
        response.credential
      );

      const token =
        result.data.access_token;

      localStorage.setItem(
        "access_token",
        token
      );

      alert(
        "Google account registered successfully!"
      );

      navigate("/client");

    } catch (error) {
      console.error(
        "Google signup failed:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        "Google signup failed.";

      alert(message);
    }
  };

  // -----------------------------------------
  // Initialize Google
  // -----------------------------------------

  useEffect(() => {
    const initializeGoogleSignup = () => {
      if (!window.google) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id:
          import.meta.env.VITE_GOOGLE_CLIENT_ID,

        callback:
          handleGoogleSignup,
      });

      const button =
        document.getElementById(
          "google-signup-button"
        );

      if (button) {
        button.innerHTML = "";

        window.google.accounts.id.renderButton(
          button,
          {
            theme: "outline",
            size: "large",
            width: 340,
            text: "signup_with",
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
        initializeGoogleSignup;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };

    } else {
      initializeGoogleSignup();
    }
  }, );

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
            Create your account
          </p>

        </div>


        {/* Signup Card */}

        <div className="bg-[#161B22] border border-zinc-800 rounded-3xl p-7 sm:p-10">

          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
            Get Started
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Create an account to start your project.
          </p>


          {/* Full Name */}

          <div className="mb-4">

            <label className="block text-sm text-zinc-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3.5 rounded-xl bg-[#0D1117] text-white placeholder:text-zinc-600 border border-zinc-700 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

          </div>


          {/* Email */}

          <div className="mb-4">

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

          <div className="mb-4">

            <label className="block text-sm text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-3.5 rounded-xl bg-[#0D1117] text-white placeholder:text-zinc-600 border border-zinc-700 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* Confirm Password */}

          <div className="mb-6">

            <label className="block text-sm text-zinc-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full p-3.5 rounded-xl bg-[#0D1117] text-white placeholder:text-zinc-600 border border-zinc-700 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>


          {/* Signup */}

          <button
            onClick={handleSignup}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >
            Create Account
          </button>


          {/* Divider */}

          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-zinc-800" />

            <span className="text-zinc-500 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-zinc-800" />

          </div>


          {/* Google Signup */}

          <div
            id="google-signup-button"
            className="flex justify-center w-full overflow-hidden"
          />


          {/* Login */}

          <p className="text-zinc-400 text-center mt-7 text-sm">

            Already have an account?{" "}

            <button
              onClick={() =>
                navigate("/login")
              }
              className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
            >
              Login
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

export default Signup;