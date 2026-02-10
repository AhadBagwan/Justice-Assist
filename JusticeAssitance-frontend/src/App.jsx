

// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// import { ThemeProvider } from './ThemeContext';
// import Footer from './components/Footer';
// import UserNavbar from './components/UserNavbar';
// import AdminNavbar from './components/AdminNavbar';
// import ScrollToTop from './components/ScrollToTop';
// import ChatbotPopup from './components/ChatbotPopup';
// import ProtectedRoute from './components/ProtectedRoute';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ForgotPassword from './pages/ForgotPassword';
// import ReportForm from './pages/ReportForm';
// import ReportDetail from './pages/ReportDetail';
// import GetGuidance from './pages/GetGuidance';
// import CyberAwareness from './pages/CyberAwareness';
// import SuspectGuess from './pages/SuspectGuess';
// import AIAssistant from './pages/AIAssistant';
// import Quiz from './pages/Quiz';
// import WhyUs from './pages/WhyUs';
// import AboutUs from './pages/AboutUs';
// import ContactUs from './pages/ContactUs';

// import UserDashboard from './pages/UserDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/AdminUsers';
// import AdminSettings from './pages/admin/AdminSettings';

// const App = () => {
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false, mirror: true });
//     const handleStorageChange = () => {
//       setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   useEffect(() => {
//     setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
//   }, [location]);

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   return (
//     <ThemeProvider>
//       <ScrollToTop />
//       {!isAuthPage && (isAdminRoute && role === 'admin' ? <AdminNavbar /> : <UserNavbar />)}

//       <Routes>
//         {/* --- Authentication Routes --- */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* --- Publicly Accessible Routes --- */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/why-us" element={<WhyUs />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/awareness" element={<CyberAwareness />} />
//         <Route path="/quiz" element={<Quiz />} />

//         {/* --- Main Redirect Logic --- */}
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <Navigate to={role === 'admin' ? "/admin/dashboard" : "/user/dashboard"} replace />
//             ) : (
//               <Navigate to="/home" replace />
//             )
//           }
//         />

//         {/* --- Protected User Routes (Require Login) --- */}
//         <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
//         <Route path="/report" element={<ProtectedRoute><ReportForm /></ProtectedRoute>} />
//         <Route path="/report/:reportId" element={<ProtectedRoute><ReportDetail /></ProtectedRoute>} />
//         <Route path="/get-guidance" element={<ProtectedRoute><GetGuidance /></ProtectedRoute>} />
//         <Route path="/suspect-guess" element={<ProtectedRoute><SuspectGuess /></ProtectedRoute>} />
//         <Route path="/chatbot" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
        
//         {/* --- Protected Admin Routes (Require Admin Login) --- */}
//         <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
//         <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
//         <Route path="/admin/settings" element={<ProtectedRoute adminOnly={true}><AdminSettings /></ProtectedRoute>} />
//       </Routes>

//       {!isAuthPage && <Footer />}
//       {isLoggedIn && !isAuthPage && location.pathname !== '/chatbot' && <ChatbotPopup />}
//     </ThemeProvider>
//   );
// };

// export default App;


// src/App.jsx (Complete, Updated File)

import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { ThemeProvider } from './ThemeContext';
import Footer from './components/Footer';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';
import ScrollToTop from './components/ScrollToTop';
import ChatbotPopup from './components/ChatbotPopup';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ReportForm from './pages/ReportForm';
import ReportDetail from './pages/ReportDetail';
import GetGuidance from './pages/GetGuidance';
import CyberAwareness from './pages/CyberAwareness';
import SuspectGuess from './pages/SuspectGuess';
import AIAssistant from './pages/AIAssistant';
import Quiz from './pages/Quiz';
import WhyUs from './pages/WhyUs';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ForensicAnalysis from './pages/ForensicAnalysis'; // <-- 1. IMPORT THE NEW COMPONENT

import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const role = localStorage.getItem('role');

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <ScrollToTop />
      {!isAuthPage && (isAdminRoute && role === 'admin' ? <AdminNavbar /> : <UserNavbar />)}

      <Routes>
        {/* --- Authentication Routes --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- Publicly Accessible Routes --- */}
        <Route path="/home" element={<Home />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/awareness" element={<CyberAwareness />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* --- Main Redirect Logic --- */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={role === 'admin' ? "/admin/dashboard" : "/user/dashboard"} replace />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* --- Protected User Routes (Require Login) --- */}
        <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><ReportForm /></ProtectedRoute>} />
        <Route path="/report/:reportId" element={<ProtectedRoute><ReportDetail /></ProtectedRoute>} />
        <Route path="/get-guidance" element={<ProtectedRoute><GetGuidance /></ProtectedRoute>} />
        <Route path="/suspect-guess" element={<ProtectedRoute><SuspectGuess /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
        <Route path="/forensic-analysis" element={<ProtectedRoute><ForensicAnalysis /></ProtectedRoute>} /> {/* <-- 2. ADD THE NEW ROUTE */}
        
        {/* --- Protected Admin Routes (Require Admin Login) --- */}
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute adminOnly={true}><AdminSettings /></ProtectedRoute>} />
      </Routes>

      {!isAuthPage && <Footer />}
      {isLoggedIn && !isAuthPage && location.pathname !== '/chatbot' && <ChatbotPopup />}
    </ThemeProvider>
  );
};

export default App;