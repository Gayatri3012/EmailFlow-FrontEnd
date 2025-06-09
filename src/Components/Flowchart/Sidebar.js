import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css'
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const Sidebar = ({addNode, setTitle, flowchartTitle}) => {
  
    const navigate = useNavigate(); 
    const [sidebarVisible, setSidebarVisible] = useState(false);
    
    // Handles adding a new node and closes sidebar on small screens
    const handleAddNode = (type) => {
      addNode(type);
      if (window.innerWidth < 768) {
        setSidebarVisible(false);   // Auto-close sidebar on mobile after adding
      }
    };

    return (<>
        {/* Toggle button (hamburger) for opening/closing sidebar */}
        <button
            className={styles.toggleButton} 
            onClick={() => setSidebarVisible(prev => !prev)}
        >
            <img src='/hamburgerIcon.png' alt='hamburger' />
        </button>
        
        {/* Sidebar content */}
        <div className={`${styles.sidebar} ${sidebarVisible ? styles.open : styles.closed}` } aria-hidden={!sidebarVisible}>

            {/* Navigation to go back to dashboard */}
            <button onClick={() => navigate("/dashboard")} className={styles.backButton}>
                <span className={styles.backIconWrapper}><ChevronLeft  size={15}/></span>
                Back to Dashboard
            </button>
            
            <h3>Email Flowchart Builder</h3>
            
            {/* Input field for setting the flowchart title */}
            <div className={styles.titleContainer}>
                <label>Flowchart Title</label>
                <input
                    type="text"
                    className={styles.titleInput}
                    value={flowchartTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Flowchart Title"
                    maxLength={60}
                />
            </div>

            <p>Click a button to add a node to your flowchart.</p>

            {/* Buttons to add different types of nodes */}
            <button onClick={() => {handleAddNode('coldEmail')}}>+ Cold Email</button>
            <button onClick={() => {handleAddNode('delay')}}>+ Wait/Delay</button>
            {/* <button onClick={() => addNode('leadSource')}>+ Lead Resource</button> */}
            <p style={{ marginTop: 20 }}>
                Click on a node to edit its details. Connect nodes to define the email sequence.
            </p>
      </div>
    
    </>)
}

export default Sidebar;