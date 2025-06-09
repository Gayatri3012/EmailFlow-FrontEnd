import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../../store/authSlice";

const GoogleSignInButton = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleButtonLoaded , setGoogleButtonLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false) // Track if the Google API script is loaded

    // 1. Callback memoized to prevent effect from re-running
  const handleCredentialResponse = useCallback((response) => {
    const token = response.credential;    
    // Send token to backend for verification and login
     // fetch('http://localhost:8080/auth/google', {
    fetch('https://emailflow-backend.onrender.com/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(login(data));
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Authentication failed:', err);
      });
  }, [dispatch, navigate]);


   // 2. Load the script once
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    script.onerror = (err) => {
      console.error('Google API script failed to load:', err);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  
    // 3. Initialize only when script is loaded
    useEffect(() => {
      if (scriptLoaded && window.google && window.google.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_CLIENT_ID,
          callback: handleCredentialResponse,
        });
  
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large', type: 'standard' }
        );
  
        setGoogleButtonLoaded(true);
      }
    }, [scriptLoaded, handleCredentialResponse]);
  
      
  return ( 
    <span>
        {/* This is the placeholder div where Google button will render */}
          <div id="googleSignInButton"></div>
          {!googleButtonLoaded && <p>Loading Google Login...</p>}
    </span>)
}

export default GoogleSignInButton;