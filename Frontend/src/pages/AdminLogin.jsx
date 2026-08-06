import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      navigate("/admin");
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">

      <div className="bg-[#161B22] p-10 rounded-xl w-[420px]">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Studio Jesly
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Admin Login
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-4 border border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-[#0D1117] text-white mb-6 border border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;