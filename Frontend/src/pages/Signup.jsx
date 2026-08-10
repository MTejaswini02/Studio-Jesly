import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signupUser,
  googleSignup,
  verifySignupOTP,
} from "../api/authApi";


function Signup() {

  const navigate = useNavigate();


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const [verificationEmail, setVerificationEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);


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

      setSubmitting(true);


      const result = await signupUser({
        full_name: fullName,
        email: email,
        password: password,
      });


      const signupEmail =
        result?.data?.email || email;


      setVerificationEmail(
        signupEmail
      );

      setOtpStep(true);


      alert(
        "OTP sent to your email. Please verify your email."
      );


    } catch (error) {

      console.error(
        "Signup failed:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        "Unable to send signup OTP.";


      alert(message);


    } finally {

      setSubmitting(false);

    }

  };


  // -----------------------------------------
  // Google Signup
  // -----------------------------------------

  const handleGoogleSignup = async (
    response
  ) => {

    try {

      setSubmitting(true);


      const result =
        await googleSignup(
          response.credential
        );


      const signupEmail =
        result?.data?.email;


      if (!signupEmail) {

        throw new Error(
          "Signup email was not returned by the server."
        );

      }


      setVerificationEmail(
        signupEmail
      );

      setOtpStep(true);


      alert(
        "OTP sent to your Google email. Please verify your email."
      );


    } catch (error) {

      console.error(
        "Google signup failed:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        "Google signup failed.";


      alert(message);


    } finally {

      setSubmitting(false);

    }

  };


  // -----------------------------------------
  // Verify Signup OTP
  // -----------------------------------------

  const handleVerifyOTP = async () => {

    if (!otp) {

      alert("Please enter the OTP.");

      return;
    }


    if (otp.length !== 6) {

      alert("Please enter the 6-digit OTP.");

      return;
    }


    try {

      setSubmitting(true);


      const result =
        await verifySignupOTP(
          verificationEmail,
          otp
        );


      const token =
        result.data.access_token;


      localStorage.setItem(
        "access_token",
        token
      );


      alert(
        "Account created successfully!"
      );


      navigate("/client");


    } catch (error) {

      console.error(
        "OTP verification failed:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        "Invalid or expired OTP.";


      alert(message);


    } finally {

      setSubmitting(false);

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
        document.createElement(
          "script"
        );


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

        if (
          document.body.contains(script)
        ) {

          document.body.removeChild(
            script
          );

        }

      };

    } else {

      initializeGoogleSignup();

    }

  }, []);


  // -----------------------------------------
  // OTP Screen
  // -----------------------------------------

  if (otpStep) {

    return (

      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">

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
              Verify your email
            </p>

          </div>


          {/* OTP Card */}

          <div className="bg-[#161B22] border border-zinc-800 rounded-3xl p-7 sm:p-10">

            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
              Verify Your Email
            </h1>


            <p className="text-zinc-400 text-center mb-8 leading-6">

              We sent a 6-digit verification code to

              <br />

              <span className="text-yellow-500 break-all">
                {verificationEmail}
              </span>

            </p>


            {/* OTP */}

            <div className="mb-6">

              <label className="block text-sm text-zinc-300 mb-2">
                Verification Code
              </label>


              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                className="w-full p-3.5 rounded-xl bg-[#0D1117] text-white text-center text-xl tracking-[8px] placeholder:text-zinc-600 placeholder:tracking-normal border border-zinc-700 outline-none transition-all duration-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
              />

            </div>


            {/* Verify */}

            <button
              onClick={handleVerifyOTP}
              disabled={submitting}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >

              {submitting
                ? "Verifying..."
                : "Verify & Create Account"}

            </button>


            {/* Back */}

            <button
              onClick={() => {

                setOtpStep(false);
                setOtp("");
                setVerificationEmail("");

              }}
              className="w-full mt-4 text-sm text-zinc-500 hover:text-yellow-500 transition-colors"
            >
              ← Back to signup
            </button>

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


  // -----------------------------------------
  // Signup UI
  // -----------------------------------------

  return (

    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">

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
            disabled={submitting}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >

            {submitting
              ? "Sending OTP..."
              : "Create Account"}

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