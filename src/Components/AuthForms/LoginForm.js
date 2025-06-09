import { useRef, useState } from 'react';
import styles from '../../styles/Auth.module.css';
import GoogleSignInButton from './GoogleSignInButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../store/authSlice";
import { Hourglass, Loader, LoaderCircle } from 'lucide-react';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDelayNote, setShowDelayNote] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const email = useRef();
    const password = useRef();

    const [errors, setErrors] = useState({});

    // Handle form submission
    const handleLogin = (event) => {
        event.preventDefault();
        setShowDelayNote(true); 
        setIsLoading(true);
        setErrors({});  // Clear existing errors

        const formData = { 
            email: email.current?.value,
            password: password.current?.value
        };

        // Send login request to backend
        fetch('https://emailflow-backend.onrender.com/auth/login', {
        // fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json().then(data => ({ data, ok: res.ok }))) 
        .then(({ data, ok }) => {
            setShowDelayNote(false);
            if (!ok) {  
                setErrors({ [data.error]: data.message }); 
                setIsLoading(false)
                return;
            }

            // If login successful, dispatch user to Redux and navigate
            // toast.success('Login Successful!')
            dispatch(login(data));
            setIsLoading(false);
            navigate('/dashboard'); 
        })
        .catch((err) => {
            // toast.error('Login Failed!')
            setShowDelayNote(false);
            setIsLoading(false);
            console.error('Login failed:', err)
        });
        
    }

    return (
    <section className={styles.FormAndOAuth}>
        
        <div className={`${styles.serverDelayMessage} ${showDelayNote ? styles.fadeIn : ""}`}>
        <Hourglass size={18} color='white' /> Just a moment... the server is waking up (Render naps when idle).
       </div>
        
        <p className={styles.FormName}>Log in to Your Account</p>
        <p className={styles.LinkToLogin}>Don&apos;t have an account? <a href='/signup'>Sign up</a></p>

        {/* Login form */}
        <form className={styles.AuthForm} onSubmit={handleLogin}>
            <label>Email</label>
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            <input 
                ref={email} type="email" name="email" required
                className={errors.email ? styles.error : ""}
                />
            <label>Password</label>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
            <input ref={password} 
                type="password" name="password" 
                required 
                className={errors.password ? styles.error : ""} 
            />
           
            <button type='submit'> 
            {/* {isLoading && <LoaderCircle size={18} className={styles.spinner}/> }<span>Login</span> */}
            {isLoading && <Loader size={18} color='white'  className={styles.spinner}/> }<span>Login</span>
            </button>
        </form>

        {/* Demo credentials note */}
        <div className={styles.demoNote}>
            <p><strong>Demo credentials:</strong></p>
            <p>Email: <code>demo@email.com</code></p>
            <p>Password: <code>demoPassword</code></p>
        </div>


        {/* Divider and Google login */}
        <div className={styles.lineWithText}>
            <span>or</span>
        </div>
        <GoogleSignInButton />
       
    </section>)
} 

export default LoginForm;