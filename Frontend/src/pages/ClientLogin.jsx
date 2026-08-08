import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  loginUser,
  googleLogin,
} from "../api/authApi";

import { isClient } from "../utils/auth";


function ClientLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // -----------------------------------------
  // Google Login
  // -----------------------------------------

  const handleGoogleLogin = useCallback(
    async (response) => {

      try {

        const result = await googleLogin(
          response.credential
        );


        const token =
          result.data.access_token;


        localStorage.setItem(
          "access_token",
          token
        );


        // Check the role from JWT

        if (isClient()) {

          navigate("/client");

          return;

        }


        // Admin or other role tried
        // to use Client Login

        localStorage.removeItem(
          "access_token"
        );


        alert(
          "This Google account is not registered as a client."
        );

      } catch (error) {

        console.error(
          "Google client login failed:",
          error
        );


        alert(
          error?.response?.data?.detail ||
          "Google login failed."
        );

      }

    },
    [navigate]
  );


  // -----------------------------------------
  // Load Google Identity Services
  // -----------------------------------------

  useEffect(() => {

    const script =
      document.createElement("script");


    script.src =
      "https://accounts.google.com/gsi/client";


    script.async = true;

    script.defer = true;


    script.onload = () => {

      if (!window.google) {

        console.error(
          "Google Identity Services failed to load."
        );

        return;

      }


      window.google.accounts.id.initialize({

        client_id:
          import.meta.env.VITE_GOOGLE_CLIENT_ID,

        callback:
          handleGoogleLogin,

      });


      const googleButton =
        document.getElementById(
          "google-client-login-button"
        );


      if (googleButton) {

        window.google.accounts.id.renderButton(
          googleButton,
          {
            theme: "outline",
            size: "large",
            width: 340,
            text: "continue_with",
          }
        );

      }

    };


    document.body.appendChild(script);


    return () => {

      if (
        document.body.contains(script)
      ) {

        document.body.removeChild(
          script
        );

      }

    };

  }, [handleGoogleLogin]);


  // -----------------------------------------
  // Email + Password Login
  // -----------------------------------------

  const handleLogin = async () => {

    if (!email || !password) {

      alert(
        "Please enter your email and password."
      );

      return;

    }


    try {

      const response =
        await loginUser(
          email,
          password
        );


      const token =
        response.data.access_token;


      localStorage.setItem(
        "access_token",
        token
      );


      // Check role

      if (isClient()) {

        navigate("/client");

        return;

      }


      // Admin tried client login

      localStorage.removeItem(
        "access_token"
      );


      alert(
        "This login is for client accounts only."
      );

    } catch (error) {

      console.error(
        "Client login failed:",
        error
      );


      alert(
        error?.response?.data?.detail ||
        "Invalid email or password."
      );

    }

  };


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
          Client Login
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


        {/* Normal Login */}

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


        {/* Google Login */}

        <div
          id="google-client-login-button"
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


export default ClientLogin;