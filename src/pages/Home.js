import styles from '../styles/Home.module.css';

const Home = () => {

    return (
        <section className={styles.HomePage}>
            {/* App Logo and Name */}
            <div className={styles.LogoAndName}>
                <img className={styles.logo} src='/bg.png' alt='email flow'/>
                <p>EmailFlow</p>
            </div>
        
            {/* Description */}
            <div className={styles.textContent}>
                <p>Design and schedule email sequences using easy-to-add logic nodes.</p>
                <p>Add delays, customize content, and let the system do the rest.</p>
            </div>

            {/* Sign Up Button */}
            <button className={styles.signupButton}>
                <a href="/signup">Sign Up</a>
            </button>

            {/* App Screenshot for UI preview */}
            <img 
                className={styles.appScreenshot} 
                src='/app-screenshot.png' 
                alt='email flow app screenshot'
            />
        
        </section>
    )
} 

export default Home;