import { useRef, useState } from 'react';
import styles from '../../styles/Auth.module.css';
import GoogleSignInButton from './GoogleSignInButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../store/authSlice";
import { toast } from 'react-toastify';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef();
    const password = useRef();

    const [errors, setErrors] = useState({});

    // Handle form submission
    const handleLogin = (event) => {
        event.preventDefault();
        setErrors({});  // Clear existing errors

        const formData = { 
            email: email.current?.value,
            password: password.current?.value
        };

        // Send login request to backend
        fetch('https://emailflow-backend.onrender.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json().then(data => ({ data, ok: res.ok }))) 
        .then(({ data, ok }) => {
            if (!ok) {  
                setErrors({ [data.error]: data.message }); 
                return;
            }

            // If login successful, dispatch user to Redux and navigate
            // toast.success('Login Successful!')
            dispatch(login(data));
            navigate('/dashboard'); 
        })
        .catch((err) => {
            // toast.error('Login Failed!')
            console.error('Login failed:', err)
        });
    }

    return (
    <section className={styles.FormAndOAuth}>
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
            <input ref={password} type="password" name="password" required className={errors.password ? styles.error : ""} />
            <button type='submit'>Login</button>
        </form>

        {/* Divider and Google login */}
        <div className={styles.lineWithText}>
            <span>or</span>
        </div>
        <GoogleSignInButton />
       
    </section>)
} 

export default LoginForm;