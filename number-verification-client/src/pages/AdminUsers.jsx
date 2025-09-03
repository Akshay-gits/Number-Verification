import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminUsers(){
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("asc");

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minNumber, setMinNumber] = useState("");
  const [maxNumber, setMaxNumber] = useState("");
  const [hasNumbers, setHasNumbers] = useState(false);

  const buildFilterParams = () => {
    let params = `sort=${sort}`;
    if (startDate) params += `&start_date=${startDate}`;
    if (endDate) params += `&end_date=${endDate}`;
    if (minNumber) params += `&min_number=${minNumber}`;
    if (maxNumber) params += `&max_number=${maxNumber}`;
    if (hasNumbers) params += `&has_numbers=true`;
    return params;
  };

  const load = async (p=1) => {
    setLoading(true);
    try {
      let res;
      const filters = buildFilterParams();
      if (query.trim() !== "") {
        res = await api.get(`/api/admin/search?q=${encodeURIComponent(query)}&${filters}`);
        setUsers(res.data.users || []);
      } else {
        res = await api.get(`/api/admin/users?page=${p}&limit=5&${filters}`);
        const data = res.data.users || [];
        if (p === 1) setUsers(data);
        else setUsers(prev => [...prev, ...data]);
      }
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(1) }, [query, sort]); 

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">All users</h2>
        <button 
          onClick={() => setSort(prev => prev === "asc" ? "desc" : "asc")}
          className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
        >
          Sort: {sort === "asc" ? "Ascending ↑" : "Descending ↓"}
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="p-2 border rounded" placeholder="Start date"/>
        <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="p-2 border rounded" placeholder="End date"/>
        <input type="number" value={minNumber} onChange={e=>setMinNumber(e.target.value)} className="p-2 border rounded" placeholder="Min number"/>
        <input type="number" value={maxNumber} onChange={e=>setMaxNumber(e.target.value)} className="p-2 border rounded" placeholder="Max number"/>
        <label className="flex items-center space-x-2 col-span-2 md:col-span-4">
          <input type="checkbox" checked={hasNumbers} onChange={e=>setHasNumbers(e.target.checked)} />
          <span>Has Armstrong numbers</span>
        </label>
        <button 
          onClick={() => load(1)}
          className="px-4 py-2 bg-gray-900 text-white rounded col-span-2 md:col-span-4"
          disabled={loading}
        >
          Apply Filters
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex">
        <input 
          type="text"
          placeholder="Search by email or username"
          value={query}
          onChange={(e)=> setQuery(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button 
          onClick={() => load(1)} 
          className="px-4 bg-gray-900 text-white rounded-r"
          disabled={loading}
        >
          Search
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        {users.length === 0 ? <div>No users</div> : (
          users.map((u, idx) => (
            <div key={idx} className="border-b py-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{u.user.email}</div>
                  <div className="text-xs text-gray-500">{u.user.role}</div>
                  <div className="text-xs text-gray-400">{new Date(u.user.created_at).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {(u.numbers || []).length} numbers
                </div>
              </div>
              <div className="mt-2 grid grid-cols-6 gap-2 text-sm">
                {(u.numbers || []).map(n => (
                  <div key={n.id} className="bg-gray-50 p-2 rounded">{n.number}</div>
                ))}
              </div>
            </div>
          ))
        )}
        
        {query.trim() === "" && (
          <div className="mt-4 text-center">
            <button 
              className="px-4 py-2 border rounded" 
              onClick={() => { setPage(p=>p+1); load(page+1); }} 
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
