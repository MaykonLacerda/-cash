import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
      </Routes>
    </BrowserRouter>
  );
}
