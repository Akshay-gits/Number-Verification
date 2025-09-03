import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function SavedTab(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async ()=> {
      try {
        const res = await api.get("/api/armstrong/numbers");
        setList(res.data.armstrong_numbers || []);
      } catch (e) {
        console.error(e);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div>
      {loading ? <div>Loading...</div> : (
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>ID</th><th>Number</th><th>Created</th></tr></thead>
          <tbody>
            {list.map(r=>(
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.id}</td>
                <td className="py-2">{r.number}</td>
                <td className="py-2">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {list.length===0 && <tr><td colSpan={3} className="py-3 text-gray-500">No saved Armstrong numbers</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
