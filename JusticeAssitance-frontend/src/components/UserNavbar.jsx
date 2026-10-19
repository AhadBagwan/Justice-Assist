

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './UserNavbar.css';
// import ThemeToggleButton from './ThemeToggleButton';

// const servicePaths = [
//   '/get-guidance',
//   '/report',
//   '/chatbot',
//   '/awareness',
//   '/suspect-guess',
// ];

// const UserNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [magicLineStyle, setMagicLineStyle] = useState({});
//   const location = useLocation();
//   const dropdownRef = useRef();
//   const navigate = useNavigate();

//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   const homeRef = useRef();
//   const servicesRef = useRef();
//   const whyUsRef = useRef();
//   const aboutUsRef = useRef();
//   const contactRef = useRef();
//   const linksRef = useRef();
//   const dashboardRef = useRef();

//   useEffect(() => {
//     setIsOpen(false);
//     setDropdownOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     let activeRef;

//     if (location.pathname === '/home') activeRef = homeRef;
//     else if (location.pathname === '/user/dashboard') activeRef = dashboardRef;
//     else if (servicePaths.includes(location.pathname)) activeRef = servicesRef;
//     else if (location.pathname === '/why-us') activeRef = whyUsRef;
//     else if (location.pathname === '/about-us') activeRef = aboutUsRef;
//     else if (location.pathname === '/contact') activeRef = contactRef;

//     if (activeRef && activeRef.current && linksRef.current) {
//       const activeRect = activeRef.current.getBoundingClientRect();
//       const parentRect = linksRef.current.getBoundingClientRect();

//       setMagicLineStyle({
//         left: activeRect.left - parentRect.left,
//         width: activeRect.width,
//       });
//     } else {
//       setMagicLineStyle({ left: 0, width: 0 });
//     }
//   }, [location.pathname, isLoggedIn]);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//     window.location.reload();
//   };

//   const getLinkClass = (path) => {
//     if (path === 'services') {
//       return servicePaths.includes(location.pathname) ? 'nav-link active' : 'nav-link';
//     }
//     return location.pathname === path ? 'nav-link active' : 'nav-link';
//   };

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/home" className="navbar-logo" onClick={() => setIsOpen(false)}>
//           Justice<span>Assist</span>
//         </Link>
//       </div>

//       <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
//         <div className="navbar-links" ref={linksRef}>
//           <Link ref={homeRef} to="/home" className={getLinkClass('/home')}>
//             Home
//           </Link>

//           {isLoggedIn && (
//             <Link ref={dashboardRef} to="/user/dashboard" className={getLinkClass('/user/dashboard')}>
//               Dashboard
//             </Link>
//           )}

//           <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
//             <span
//               ref={servicesRef}
//               className={getLinkClass('services')}
//               role="button"
//               tabIndex={0}
//               onClick={() => setDropdownOpen(prev => !prev)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') setDropdownOpen(prev => !prev);
//               }}
//             >
//               Services ▾
//             </span>
//             <div className="dropdown-content">
//               <Link to="/get-guidance">Get Guidance</Link>
//               <Link to="/report">PDF Generator</Link>
//               <Link to="/chatbot">AI Assistant</Link>
//               <Link to="/awareness">Cyber Awareness</Link>
//               <Link to="/suspect-guess">Suspect Guess</Link>
//             </div>
//           </div>

//           <Link ref={whyUsRef} to="/why-us" className={getLinkClass('/why-us')}>
//             Why Us
//           </Link>
//           <Link ref={aboutUsRef} to="/about-us" className={getLinkClass('/about-us')}>
//             About Us
//           </Link>
//           <Link ref={contactRef} to="/contact" className={getLinkClass('/contact')}>
//             Contact
//           </Link>
//           <div className="magic-line" style={magicLineStyle}></div>
//         </div>
//       </div>

//       <div className="navbar-right">
//         <ThemeToggleButton />
//         {isLoggedIn ? (
//           <button onClick={handleLogout} className="logout-button">
//             Logout
//           </button>
//         ) : (
//           <div style={{ display: 'flex', gap: '1rem' }}>
//             <Link to="/login" className="nav-link" style={{ border: '1px solid #DBE2EF', borderRadius: '8px', padding: '0.5rem 1rem' }}>Login</Link>
//             <Link to="/signup" className="logout-button">Sign Up</Link>
//           </div>
//         )}
//         <div className="hamburger" onClick={toggleMenu}>
//           <span className={`bar ${isOpen ? 'rotate1' : ''}`}></span>
//           <span className={`bar ${isOpen ? 'fade' : ''}`}></span>
//           <span className={`bar ${isOpen ? 'rotate2' : ''}`}></span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default UserNavbar;

// src/components/UserNavbar.jsx (Complete, Updated File)

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './UserNavbar.css';
import ThemeToggleButton from './ThemeToggleButton';

const servicePaths = [
  '/get-guidance',
  '/report',
  '/chatbot',
  '/awareness',
  '/suspect-guess',
  '/forensic-analysis', // <-- 1. ADD THE NEW PATH HERE
];

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [magicLineStyle, setMagicLineStyle] = useState({});
  const location = useLocation();
  const dropdownRef = useRef();
  const profileRef = useRef();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPfp, setUserPfp] = useState('');

  const loadUserData = () => {
    const savedEmail = localStorage.getItem('userEmail') || 'bagwanahad@gmail.com';
    const defaultNameFromEmail = savedEmail.split('@')[0];
    const formattedName = defaultNameFromEmail.charAt(0).toUpperCase() + defaultNameFromEmail.slice(1);

    const savedName = localStorage.getItem('userName') || formattedName || 'Ahad Bagwan';
    const savedPfp = localStorage.getItem('userPfp') || '';

    setUserName(savedName);
    setUserEmail(savedEmail);
    setUserPfp(savedPfp);
  };

  useEffect(() => {
    loadUserData();
    window.addEventListener('storage', loadUserData);
    return () => window.removeEventListener('storage', loadUserData);
  }, []);

  const firstLetter = (userName || userEmail || 'U').charAt(0).toUpperCase();

  const homeRef = useRef();
  const servicesRef = useRef();
  const whyUsRef = useRef();
  const aboutUsRef = useRef();
  const contactRef = useRef();
  const linksRef = useRef();
  const dashboardRef = useRef();

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let activeRef;

    if (location.pathname === '/home') activeRef = homeRef;
    else if (location.pathname === '/user/dashboard') activeRef = dashboardRef;
    else if (servicePaths.includes(location.pathname)) activeRef = servicesRef;
    else if (location.pathname === '/why-us') activeRef = whyUsRef;
    else if (location.pathname === '/about-us') activeRef = aboutUsRef;
    else if (location.pathname === '/contact') activeRef = contactRef;

    if (activeRef && activeRef.current && linksRef.current) {
      const activeRect = activeRef.current.getBoundingClientRect();
      const parentRect = linksRef.current.getBoundingClientRect();

      setMagicLineStyle({
        left: activeRect.left - parentRect.left,
        width: activeRect.width,
      });
    } else {
      setMagicLineStyle({ left: 0, width: 0 });
    }
  }, [location.pathname, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };

  const getLinkClass = (path) => {
    if (path === 'services') {
      return servicePaths.includes(location.pathname) ? 'nav-link active' : 'nav-link';
    }
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-logo" onClick={() => setIsOpen(false)}>
          Justice<span>Assist</span>
        </Link>
      </div>

      <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
        <div className="navbar-links" ref={linksRef}>
          <Link ref={homeRef} to="/home" className={getLinkClass('/home')}>
            Home
          </Link>

          {isLoggedIn && (
            <Link ref={dashboardRef} to="/user/dashboard" className={getLinkClass('/user/dashboard')}>
              Dashboard
            </Link>
          )}

          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
            <span
              ref={servicesRef}
              className={getLinkClass('services')}
              role="button"
              tabIndex={0}
              onClick={() => setDropdownOpen(prev => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setDropdownOpen(prev => !prev);
              }}
            >
              Services ▾
            </span>
            <div className="dropdown-content">
              <Link to="/get-guidance">Get Guidance</Link>
              <Link to="/report">Complaint Form (PDF)</Link>
              <Link to="/forensic-analysis">Forensic Analysis Tool</Link> {/* <-- 2. ADD THE NEW LINK */}
              <Link to="/chatbot">AI Assistant</Link>
              <Link to="/awareness">Cyber Awareness</Link>
              <Link to="/suspect-guess">Suspect Guess</Link>
            </div>
          </div>

          <Link ref={whyUsRef} to="/why-us" className={getLinkClass('/why-us')}>
            Why Us
          </Link>
          <Link ref={aboutUsRef} to="/about-us" className={getLinkClass('/about-us')}>
            About Us
          </Link>
          <Link ref={contactRef} to="/contact" className={getLinkClass('/contact')}>
            Contact
          </Link>
          <div className="magic-line" style={magicLineStyle}></div>
        </div>
      </div>

      <div className="navbar-right">
        <ThemeToggleButton />
        {isLoggedIn ? (
          <div className="profile-dropdown-container" ref={profileRef}>
            <button 
              onClick={() => setProfileOpen(prev => !prev)} 
              className="profile-button"
            >
              {userPfp ? (
                <img src={userPfp} alt="Profile" className="nav-avatar-img" />
              ) : (
                <div className="nav-avatar-initial">{firstLetter}</div>
              )}
              <span className="nav-profile-name">{userName}</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </button>
            
            {profileOpen && (
              <div className="profile-dropdown-menu">
                <div className="profile-header">
                  {userPfp ? (
                    <img src={userPfp} alt="Profile" className="dropdown-avatar-img" />
                  ) : (
                    <div className="dropdown-avatar-initial">{firstLetter}</div>
                  )}
                  <div className="profile-info">
                    <span className="profile-name">{userName}</span>
                    <span className="profile-email">{userEmail}</span>
                    <span className="profile-role">
                      Role: <strong>{role || 'User'}</strong> • <span className="status-badge">Active</span>
                    </span>
                  </div>
                </div>

                <div className="profile-divider"></div>

                <div className="profile-actions">
                  <Link 
                    to="/user/settings" 
                    className="profile-menu-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <i className="fa-solid fa-gear"></i> Settings / Manage Account
                  </Link>
                  <Link 
                    to={role === 'admin' ? "/admin/dashboard" : "/user/dashboard"} 
                    className="profile-menu-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <i className="fa-solid fa-gauge-high"></i> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="profile-menu-item logout-item">
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="nav-link" style={{ border: '1px solid #DBE2EF', borderRadius: '8px', padding: '0.5rem 1rem' }}>Login</Link>
            <Link to="/signup" className="logout-button">Sign Up</Link>
          </div>
        )}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'rotate1' : ''}`}></span>
          <span className={`bar ${isOpen ? 'fade' : ''}`}></span>
          <span className={`bar ${isOpen ? 'rotate2' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;