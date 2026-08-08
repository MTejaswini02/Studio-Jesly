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

      alert(
        "Password must be at least 8 characters."
      );

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

      console.error(
        "Signup failed:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        "Unable to create account.";

      alert(message);

    }

  };


  // -----------------------------------------
  // Google Signup
  // -----------------------------------------

  const handleGoogleSignup = async (
    response
  ) => {

    try {

      const result =
        await googleSignup(
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
          import.meta.env
            .VITE_GOOGLE_CLIENT_ID,

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

      document.body.appendChild(
        script
      );


      return () => {

        document.body.removeChild(
          script
        );

      };

    } else {

      initializeGoogleSignup();

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
          Create Your Account
        </p>


        {/* Full Name */}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-4 border border-zinc-700"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />


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
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-4 border border-zinc-700"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        {/* Confirm Password */}

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-6 border border-zinc-700"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />


        {/* Signup */}

        <button
          onClick={handleSignup}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-semibold"
        >
          Create Account
        </button>


        {/* Divider */}

        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-px bg-zinc-700" />

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-zinc-700" />

        </div>


        {/* Google Signup */}

        <div
          id="google-signup-button"
          className="flex justify-center"
        />


        {/* Login */}

        <p className="text-gray-400 text-center mt-6">

          Already have an account?{" "}

          <button
            onClick={() =>
              navigate("/login")
            }
            className="text-yellow-400 hover:text-yellow-300"
          >
            Login
          </button>

        </p>

      </div>

    </div>

  );

}


export default Signup;