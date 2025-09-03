import React, { useState } from "react";
import api from "../api/api";

export default function VerifyTab(){
  const [num, setNum] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const parsed = parseInt(num, 10);
    if (Number.isNaN(parsed)) return setMessage({ type: "error", text: "Enter a valid integer."});
    setLoading(true);
    try {
      const res = await api.post("/api/armstrong/verify", { number: parsed });
      setMessage({ type: "success", text: res.data.message || "Saved" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed" });
    } finally { setLoading(false); }
  };

  return (
    <div>
      <form onSubmit={submit} className="flex gap-2">
        <input value={num} onChange={e=>setNum(e.target.value)} placeholder="Enter number" className="flex-1 p-2 border rounded" />
        <button className="px-4 py-2 bg-gray-900 text-white rounded" disabled={loading}>{loading ? "Checking..." : "Verify"}</button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded ${message.type==="error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
