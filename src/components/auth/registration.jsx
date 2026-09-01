import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userEmail = email.trim().toLowerCase();

      const checkResponse = await fetch(
        `http://localhost:3000/auth?email=${encodeURIComponent(userEmail)}`,
      );

      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setError("An account with this email already exists.");
        return;
      }

      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: userEmail,
          password: password,
        }),
      });

      if (!response.ok) {
        setError("Registration failed. Please try again.");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded focus:outline-blue-500"
          />

          <input
            type="email"
            placeholder="Enter Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded focus:outline-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password (min 6 chars)..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded w-full pr-16 focus:outline-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
