import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrar" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
