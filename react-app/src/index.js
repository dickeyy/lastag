import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import AccountPage from './pages/Account';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="about" element={<AboutPage />} />

      <Route path="signup" element={<SignupPage />} />

      <Route path='login' element={<LoginPage />} />

      <Route path='account' element={<AccountPage />} />

    </Routes>
  </BrowserRouter>
);