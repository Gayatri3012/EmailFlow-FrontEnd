import { useRef, useState } from 'react';
import styles from '../../styles/Auth.module.css';
import GoogleSignInButton from './GoogleSignInButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupForm = () => {

    const navigate = useNavigate();

    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const [errors, setErrors] = useState({});

     // Handle form submission
    const handleSignup = (event) => {
        event.preventDefault();
        setErrors({}); 

        const formData = {
            name: fullName.current?.value,
            email: email.current?.value,
            password: password.current?.value
        };


         // Send signup request to backend
        fetch('https://emailflow-backend.onrender.com/auth/signup', {
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
            // toast.success('Signup Successful!')
            navigate('/login'); 
        })
        .catch((err) => {
            // toast.error('Signup Failed!')
            console.error('Signup failed:', err)
        });

    }

    return (
    <section className={styles.FormAndOAuth}>
        <p className={styles.FormName}>Create an account</p>
        <p className={styles.LinkToLogin}>Already have an account? <a href='/login'>Log in</a></p>

        {/* Signup form */}
        <form className={styles.AuthForm} onSubmit={(e) => handleSignup(e)}>
            <label>Full Name</label>
            <input type='text' ref={fullName} required  />
            <label>Email</label>
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            <input type='email' ref={email} required className={errors.email ? styles.error : ""}/>
            <label>Password</label>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
            <input type='password' ref={password} required className={errors.password ? styles.error : ""}/>
            <button type='submit'>Signup</button>
        </form>

        {/* Divider and Google OAuth button */}
        <div className={styles.lineWithText}>
            <span>or</span>
        </div>
    
        <GoogleSignInButton />
    </section>)
} 

export default SignupForm;