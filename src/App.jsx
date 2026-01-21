import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import NotFound from './components/NotFound';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* layout chính */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<QuizPage />} />
        </Route>

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}