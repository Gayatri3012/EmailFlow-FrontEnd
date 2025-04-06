import styles from '../styles/Auth.module.css';

import SignupForm from '../Components/AuthForms/SignupForm'

const Signup = () => {

    return (<section className={styles.AuthPage}>
        <section className={styles.AuthContainer}>
            <SignupForm />
        </section>
    </section>)
} 

export default Signup;