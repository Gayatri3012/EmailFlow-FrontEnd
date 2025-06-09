import { Brain, Calendar, ChartNetwork, Fingerprint, MessageCircle, Save } from 'lucide-react';
import styles from '../styles/Home.module.css';

const Home = () => {

    return (
        <section className={styles.HomePage}>
            {/* App Logo and Name */}
            <div className={styles.LogoAndName}>
                <img className={styles.logo} src='/bg.png' alt='email flow'/>
                <p>EmailFlow</p>
            </div>
        
        <div className={styles.contentContainer}>
            {/* Description */}
            <div className={styles.textContent}>
                <p>
                    EmailFlow lets you build and schedule email sequences effortlessly using simple node-based logic.
                        
                </p>

                <p>
                    Use AI to help write cold emails and automate your campaigns in just a few clicks.
                </p>
                        
                {/* Sign Up Button */}
                <button className={styles.signupButton}>
                    <a href="/signup">Sign Up</a>
                </button>

            </div>
             
            {/* App Screenshot for UI preview */}
            <img 
                className={styles.appScreenshot} 
                src='/app-screenshot.png' 
                alt='email flow app screenshot'
            />

        </div>
           
           
        {/* Feature Highlights */}
        <div className={styles.featuresWrapper}>
            <div className={styles.scrollTrack}>
                <span className={styles.scrollItem}><Fingerprint size={35} /> OAuth login with Google</span>
                <span className={styles.scrollItem}><Brain size={35}/>“Ask AI” button for writing assistance</span>
                <span className={styles.scrollItem}><MessageCircle size={35} /> AI content in email modals</span>
                <span className={styles.scrollItem}><ChartNetwork size={35} /> Node-based sequence builder</span>
                <span className={styles.scrollItem}><Save size={35} /> Save flowchart anytime</span>
                <span className={styles.scrollItem}><Calendar size={35} /> Schedule email sequences</span>

                 {/* Repeat all items again for seamless scroll */}
                 <span className={styles.scrollItem}><Fingerprint size={35} /> OAuth login with Google</span>
                <span className={styles.scrollItem}><Brain size={35}/>“Ask AI” button for writing assistance</span>
                <span className={styles.scrollItem}><MessageCircle size={35} /> AI content in email modals</span>
                <span className={styles.scrollItem}><ChartNetwork size={35} /> Node-based sequence builder</span>
                <span className={styles.scrollItem}><Save size={35} /> Save flowchart anytime</span>
                <span className={styles.scrollItem}><Calendar size={35} /> Schedule email sequences</span>
            </div>
        </div>

        </section>
    )
} 

export default Home;