import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../auth/useAuth";

function parseJwt(token) {
  try {
    const base = token.split(".")[1];
    return JSON.parse(atob(base));
  } catch(e) { return null; }
}

export default function Login(){
  const [form, setForm] = useState({ email:"", password:"" });
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      const payload = parseJwt(token);
      const role = payload?.role || "user";
      login({ token, role });
      // redirect to admin or home
      if (role === "admin") nav("/admin");
      else nav("/home");
    } catch (e) {
      setErr(e.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input 
          value={form.email} 
          onChange={e=>setForm({...form, email:e.target.value})} 
          placeholder="Email" 
          className="w-full p-2 border rounded" 
          type="email" 
          required
        />
        <input 
          value={form.password} 
          onChange={e=>setForm({...form, password:e.target.value})} 
          placeholder="Password" 
          className="w-full p-2 border rounded" 
          type="password" 
          required
        />
        <button className="w-full py-2 bg-gray-900 text-white rounded">Login</button>
      </form>

      {/* Register link */}
      <div className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register new user
        </Link>
      </div>
    </div>
  );
}
