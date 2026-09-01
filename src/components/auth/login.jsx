import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/auth?email=${encodeURIComponent(
          email.trim().toLowerCase(),
        )}`,
      );

      const users = await response.json();

      if (users.length === 0) {
        setError("Invalid email or password.");
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              placeholder="Enter Password..."
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
