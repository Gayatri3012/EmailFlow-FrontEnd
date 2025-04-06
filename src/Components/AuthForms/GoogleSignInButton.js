import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../../store/authSlice";
import { toast } from 'react-toastify';

const GoogleSignInButton = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

   // Callback function to handle Google credential response
  const handleCredentialResponse = (response) => {
    const token = response.credential;
    
    // Send token to backend for verification and login
    fetch('https://emailflow-backend.onrender.com/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log('User authenticated:', data);
      // toast.success('Sign in Successful')
      dispatch(login(data));  // Save user data to Redux store
      navigate('/dashboard')  // Redirect to dashboard
    })
    .catch((err) => {
      // toast.error('Authentication Failed!')
      console.error('Authentication failed:', err)});

  };

  // Initialize Google Sign-In button on component mount
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID,
        callback: handleCredentialResponse,
      });
        
        
        // Render the Google sign-in button in the target div
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    } else {
          console.error("Google API not loaded");
        }
  }, [handleCredentialResponse]);
      
  return ( 
    <span>
        {/* This is the placeholder div where Google button will render */}
         <div id="googleSignInButton"></div>
    </span>)
}

export default GoogleSignInButton;