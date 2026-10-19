// src/pages/UserSettings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSettings.css';

const UserSettings = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pfp, setPfp] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail') || 'bagwanahad@gmail.com';
    const defaultNameFromEmail = savedEmail.split('@')[0];
    const formattedName = defaultNameFromEmail.charAt(0).toUpperCase() + defaultNameFromEmail.slice(1);
    
    const savedName = localStorage.getItem('userName') || formattedName || 'Ahad Bagwan';
    const savedPfp = localStorage.getItem('userPfp') || '';

    setName(savedName);
    setEmail(savedEmail);
    setPfp(savedPfp);
  }, []);

  const initialLetter = (name || email || 'U').charAt(0).toUpperCase();

  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('Image size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfp(reader.result);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePfp = () => {
    setPfp('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Name cannot be empty.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Email cannot be empty.');
      return;
    }

    localStorage.setItem('userName', name.trim());
    localStorage.setItem('userEmail', email.trim());
    if (pfp) {
      localStorage.setItem('userPfp', pfp);
    } else {
      localStorage.removeItem('userPfp');
    }

    // Trigger storage event for navbar auto-update
    window.dispatchEvent(new Event('storage'));

    setSuccessMsg('Account details updated successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="user-settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h2>Account Settings</h2>
          <p>Manage your profile details, email, and profile avatar.</p>
        </div>

        {successMsg && <div className="settings-alert success">{successMsg}</div>}
        {errorMsg && <div className="settings-alert error">{errorMsg}</div>}

        <form onSubmit={handleSave} className="settings-form">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-preview-wrapper">
              {pfp ? (
                <img src={pfp} alt="Profile" className="avatar-preview-img" />
              ) : (
                <div className="avatar-preview-initial">{initialLetter}</div>
              )}
            </div>

            <div className="avatar-controls">
              <h3>Profile Photo</h3>
              <p>JPG or PNG under 2MB. If no photo is set, your initial (<strong>{initialLetter}</strong>) will be displayed.</p>
              
              <div className="avatar-btn-group">
                <label className="upload-btn">
                  <i className="fa-solid fa-camera"></i> Change Photo
                  <input type="file" accept="image/*" onChange={handlePfpChange} style={{ display: 'none' }} />
                </label>
                {pfp && (
                  <button type="button" onClick={handleRemovePfp} className="remove-pfp-btn">
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="settings-divider"></div>

          {/* User Info Fields */}
          <div className="form-group">
            <label htmlFor="user-name">Full Name</label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahad Bagwan"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user-email">Email Address</label>
            <input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. bagwanahad@gmail.com"
              required
            />
          </div>

          <div className="settings-actions">
            <button type="submit" className="save-settings-btn">
              <i className="fa-solid fa-floppy-disk"></i> Save Changes
            </button>
            <button type="button" onClick={() => navigate(-1)} className="cancel-settings-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
