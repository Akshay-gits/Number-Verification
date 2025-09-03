import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form, setForm] = useState({ username: "", email:"", password:"" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/auth/register", form);
      nav("/login");
    } catch (e) {
      setErr(e.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-2 border rounded" required/>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" type="email" required/>
        <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" type="password" required minLength={6}/>
        <button className="w-full py-2 bg-gray-900 text-white rounded">Register</button>
      </form>
      <div className="text-sm text-gray-500 mt-3">Already have an account? <a className="text-blue-600" href="/login">Login</a></div>
    </div>
  );
}
