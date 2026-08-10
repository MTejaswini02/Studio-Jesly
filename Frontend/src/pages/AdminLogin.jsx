import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  googleLogin,
} from "../api/authApi";

function AdminLogin() {
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

        localStorage.setItem(
          "access_token",
          result.data.access_token
        );

        navigate("/admin");

      } catch (error) {
        console.error(
          "Google login failed:",
          error
        );

        alert(
          "Google login failed. Make sure your Google account is registered in Studio Jesly."
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
        callback: handleGoogleLogin,
      });

      const googleButton =
        document.getElementById(
          "google-login-button"
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
        document.body.removeChild(script);
      }
    };
  }, [handleGoogleLogin]);

  // -----------------------------------------
  // Email + Password Login
  // -----------------------------------------

  const handleLogin = async () => {
    try {
      const response = await loginUser(
        email,
        password
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      navigate("/admin");

    } catch (error) {
      alert(
        "Invalid email or password"
      );

      console.error(error);
    }
  };

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
            Secure administration portal
          </p>

        </div>


        {/* Admin Card */}

        <div className="bg-[#161B22] border border-zinc-800 rounded-3xl p-7 sm:p-10">

          {/* Heading */}

          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

              <span className="text-yellow-500 text-xl">
                ◆
              </span>

            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Login
            </h1>

            <p className="text-zinc-400 mt-2 text-sm">
              Sign in to manage Studio Jesly.
            </p>

          </div>


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
            Login to Admin
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

        </div>


        {/* Back */}

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

export default AdminLogin;