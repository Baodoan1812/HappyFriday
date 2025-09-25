// src/pages/Login.tsx
import { useState } from "react";
import { signin } from "../services/auth/auth";
import useGetDataUser from "../hooks/useGetUserData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Login() {
  const Navigate= useNavigate();
  const { user } = useGetDataUser();
  useEffect(() => {
    if (user) {
      Navigate("/");
    }
  }, [user, Navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signin(email, password);
    localStorage.setItem("token", res.access);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
