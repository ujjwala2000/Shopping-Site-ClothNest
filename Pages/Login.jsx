import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../assets/login-logo.png";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !mobile || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        mobile,
        username,
        password,
      })
    );

    alert("Registration Successful");
    setIsRegister(false);

    setName("");
    setMobile("");
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username === username && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-[900px] bg-white shadow-2xl rounded-xl overflow-hidden flex">

        {/* LEFT PANEL */}
        <div className="w-2/5 bg-blue-600 text-white p-10">
          <h1 className="text-4xl font-bold">
            ClothNest
          </h1>

          <p className="mt-6 text-lg">
            {isRegister
              ? " Welcome back! Create your account and Continue shopping your favorite styles."
              : "Discover trending fashion, manage your orders, and shop easily"}
          </p>
          <img
            src={loginLogo}
            alt="ClothNest Login Logo"
            className="mt-15 w-50 mx-auto"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-3/5 p-10">

          <h2 className="text-3xl font-bold mb-8 text-center">
            {isRegister ? "Create Account" : "Login"}
          </h2>

          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
              />

              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
              />
            </>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          {isRegister ? (
            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            >
              Login
            </button>
          )}

          <div className="text-center mt-6">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 font-semibold"
            >
              {isRegister
                ? "Already have an account? Login"
                : "New User? Create Account"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;