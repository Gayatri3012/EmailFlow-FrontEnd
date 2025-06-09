import { useRef, useState } from 'react';
import styles from '../../styles/Auth.module.css';
import GoogleSignInButton from './GoogleSignInButton';
import { useNavigate } from 'react-router-dom';
import { Hourglass, Loader } from 'lucide-react';

const SignupForm = () => {

    const navigate = useNavigate();

    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [showDelayNote, setShowDelayNote] = useState(false);
    const [errors, setErrors] = useState({});

     // Handle form submission
    const handleSignup = (event) => {
        event.preventDefault();
        setShowDelayNote(true); 
        setIsLoading(true);
        setErrors({}); 

        const formData = {
            name: fullName.current?.value,
            email: email.current?.value,
            password: password.current?.value
        };


         // Send signup request to backend
        fetch('https://emailflow-backend.onrender.com/auth/signup', {
        // fetch('http://localhost:8080/auth/signup', {
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
            // toast.success('Signup Successful!')
            setIsLoading(false);
            navigate('/login'); 
        })
        .catch((err) => {
            // toast.error('Signup Failed!')
            setShowDelayNote(false);
            setIsLoading(false);
            console.error('Signup failed:', err)
        });

    }

    return (
    <section className={styles.FormAndOAuth}>
        {showDelayNote && (
           <div className={`${styles.serverDelayMessage} ${showDelayNote ? styles.fadeIn : ""}`}>
           <Hourglass size={18} color='white' /> Just a moment... the server is waking up (Render naps when idle).
         </div>
        )}
        <p className={styles.FormName}>Create an account</p>
        <p className={styles.LinkToLogin}>Already have an account? <a href='/login'>Log in</a></p>
        <p className={styles.demologinLink}>Demo login is available on the <a href="/login">Login</a> page.</p>

        {/* Signup form */}
        <form className={styles.AuthForm} onSubmit={(e) => handleSignup(e)}>
            <label>Full Name</label>
            <input type='text' ref={fullName} required  minLength={2} />
            <label>Email</label>
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            <input type='email' ref={email} required className={errors.email ? styles.error : ""}/>
            <label>Password</label>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
            <input type='password' ref={password} required className={errors.password ? styles.error : ""}/>
        
            <button type='submit'> 
            {/* {isLoading && <LoaderCircle size={18} className={styles.spinner}/> }<span>Login</span> */}
            {isLoading && <Loader size={18} color='white' className={styles.spinner}/> }<span>Signup</span>
            </button>
        </form>

        {/* Divider and Google OAuth button */}
        <div className={styles.lineWithText}>
            <span>or</span>
        </div>
    
        <GoogleSignInButton />
    </section>)
} 

export default SignupForm;