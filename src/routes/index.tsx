import { Register } from 'pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registrar" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
