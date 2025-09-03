import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminUsers from "./pages/AdminUsers";
import useAuth from "./auth/useAuth";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminUsers/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
