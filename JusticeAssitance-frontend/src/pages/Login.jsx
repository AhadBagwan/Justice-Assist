

// // export default Login;
// // src/pages/Login.jsx

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaUserShield, FaUser, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
// import './Login.css';
// import axios from 'axios';

// const Login = () => {
//   const [role, setRole] = useState('user');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
//         username: email,
//         password: password,
//       });

//       const { access_token } = response.data;
//       localStorage.setItem('token', access_token);
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('role', role);

//       // 👇 THIS IS THE KEY CHANGE
//       // We now navigate based on the role to the correct dashboard.
//       if (role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         // 👈 Changed from '/home' to '/user/dashboard'
//         navigate('/user/dashboard'); 
//       }
//       window.location.reload(); 

//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         setError('Invalid username or password.');
//       } else {
//         setError('Login failed. Could not connect to the server.');
//       }
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className="login-page-wrapper">
//       <div className="login-form-container-single">
//         <h2>Login to JusticeAssist</h2>

//         <div className="role-switcher">
//           <button
//             className={`role-btn ${role === 'user' ? 'active' : ''}`}
//             onClick={() => setRole('user')}
//           >
//             <FaUser /> User
//           </button>
//           <button
//             className={`role-btn ${role === 'admin' ? 'active' : ''}`}
//             onClick={() => setRole('admin')}
//           >
//             <FaUserShield /> Admin
//           </button>
//         </div>

//         <form onSubmit={handleLogin} className="login-form-element">
//           <div className="input-group">
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email Address"
//             />
//           </div>

//           <div className="input-group">
//             <div className="password-input">
//               <input
//                 type={showPass ? 'text' : 'password'}
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//               />
//               <span onClick={() => setShowPass(!showPass)} className="password-toggle">
//                 {showPass ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           {error && <p className="error-message">{error}</p>}

//           <div className="form-options">
//             <div className="toggle-switch-container">
//               <input type="checkbox" id="remember-me" className="toggle-switch-checkbox" />
//               <label htmlFor="remember-me" className="toggle-switch-label"></label>
//               <span>Remember Me</span>
//             </div>
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </div>

//           <button type="submit" className="login-btn">Login</button>
//         </form>

//         <div className="divider">OR</div>

//         <div className="social-login">
//           <button className="social-btn google-btn"><FaGoogle /> Sign in with Google</button>
//         </div>

//         <div className="signup-link">
//           <p>New here? <Link to="/signup">Create an Account</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserShield, FaUser, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // --- MODIFICATION START ---
      // The 'role' from the component's state is now included in the request payload.
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: email,
        password: password,
        role: role // Send the selected role to the backend for verification
      });
      // --- MODIFICATION END ---

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', role); // Store the role from the frontend button

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard'); 
      }
      window.location.reload(); 

    } catch (err) {
      // --- MODIFICATION START ---
      // The error message is now more generic because a 401 could mean
      // bad password OR insufficient permissions, as handled by the new backend logic.
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials or you do not have permission for this role.');
      } else {
        setError('Login failed. Could not connect to the server.');
      }
      // --- MODIFICATION END ---
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-container-single">
        <h2>Login to JusticeAssist</h2>

        <div className="role-switcher">
          <button
            className={`role-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            <FaUser /> User
          </button>
          <button
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <FaUserShield /> Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form-element">
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>

          <div className="input-group">
            <div className="password-input">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span onClick={() => setShowPass(!showPass)} className="password-toggle">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-options">
            <div className="toggle-switch-container">
              <input type="checkbox" id="remember-me" className="toggle-switch-checkbox" />
              <label htmlFor="remember-me" className="toggle-switch-label"></label>
              <span>Remember Me</span>
            </div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="divider">OR</div>

        <div className="social-login">
          <button className="social-btn google-btn"><FaGoogle /> Sign in with Google</button>
        </div>

        <div className="signup-link">
          <p>New here? <Link to="/signup">Create an Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;