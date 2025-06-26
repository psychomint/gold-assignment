import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if (localStorage.getItem("userId")) {
    //   navigate("/");
    // }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const url = showRegister ? "register" : "login";
    const bodyData = showRegister
      ? form
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(`${BACKEND_API}/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Action failed" });
      } else {
        setMessage({ type: "success", text: data.message });
        if (!showRegister) {
          console.log("Logged in user ID:", data.userId);
          localStorage.setItem("userId", data.userId);
        }
        setForm({ name: "", email: "", password: "" });
        navigate("/reviews");
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setMessage({ type: "error", text: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#161b22] border border-slate-700 text-white p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          {loading
            ? showRegister
              ? "Registering..."
              : "Logging in..."
            : showRegister
            ? "Register"
            : "Login"}
        </h2>

        {message && (
          <p
            className={`mb-4 text-sm ${
              message.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        {showRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 bg-[#0d1117] border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-[#0d1117] border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 bg-[#0d1117] border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition duration-200 mb-3 cursor-pointer"
        >
          {loading
            ? showRegister
              ? "Registering..."
              : "Logging in..."
            : showRegister
            ? "Register"
            : "Login"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowRegister((prev) => !prev);
            setMessage(null);
          }}
          className="w-full text-sm text-yellow-400 hover:underline text-center cursor-pointer"
        >
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
}
