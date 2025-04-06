import LoginForm from '../Components/AuthForms/LoginForm';

import styles from '../styles/Auth.module.css';

const Login = () => {

    return  (<section className={styles.AuthPage}>
        <section className={styles.AuthContainer}>
            <LoginForm />
        </section>
    </section>)
} 

export default Login;