import api from "./api";


// -----------------------------------------
// Email + Password Login
// -----------------------------------------

export const loginUser = (email, password) => {

  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  return api.post(
    "/users/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

};


// -----------------------------------------
// Google Login
// -----------------------------------------

export const googleLogin = (googleToken) => {

  return api.post(
    "/users/google-login",
    {
      google_token: googleToken,
    }
  );

};


// -----------------------------------------
// Email + Password Signup
// -----------------------------------------

export const signupUser = (userData) => {

  return api.post(
    "/users/signup",
    userData
  );

};


// -----------------------------------------
// Google Signup
// -----------------------------------------

export const googleSignup = (googleToken) => {

  return api.post(
    "/users/google-signup",
    {
      google_token: googleToken,
    }
  );

};

export const verifySignupOTP = (email, otp) => {
  return api.post("/users/verify-signup-otp", {
    email,
    otp,
  });
};