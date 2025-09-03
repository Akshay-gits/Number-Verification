import React, { useState } from "react";
import VerifyTab from "./VerifyTab";
import SavedTab from "./SavedTab";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const [tab, setTab] = useState("verify");
  const { logout, role } = useAuth();
  const nav = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <nav className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <button onClick={()=>setTab("verify")} className={`px-3 py-1 rounded ${tab==="verify" ? "bg-gray-900 text-white" : "bg-white border"}`}>Verify</button>
          <button onClick={()=>setTab("saved")} className={`px-3 py-1 rounded ${tab==="saved" ? "bg-gray-900 text-white" : "bg-white border"}`}>Saved</button>
        </div>
        <div className="flex items-center gap-3">
          {role === "admin" && <button onClick={()=>nav("/admin")} className="px-3 py-1 border rounded text-sm">Admin</button>}
          <button onClick={() => { logout(); nav("/login"); }} className="px-3 py-1 border rounded text-sm">Logout</button>
        </div>
      </nav>

      <div className="bg-white p-6 rounded shadow">
        {tab === "verify" ? <VerifyTab/> : <SavedTab/>}
      </div>
    </div>
  );
}
