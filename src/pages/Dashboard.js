import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useEffect, useState } from 'react';
import FlowChartListItem from '../Components/Flowchart/FlowChartListItem'
import { Loader } from 'lucide-react';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [flowcharts, setFlowcharts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

    // Fetch flowcharts from backend when component mounts
    useEffect(() => {
        const fetchFlowcharts = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");    // Get auth token from localStorage
            const response = await fetch(`https://emailflow-backend.onrender.com/emailFlow/flowcharts/${user._id}`, {
            // const response = await fetch(`http://localhost:8080/emailFlow/flowcharts/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            // console.log(data)
            setFlowcharts(data);
            setIsLoading(false);
        };
    
        fetchFlowcharts();
    }, []);


    // Logout handler
    const handleLogout = (event) => {
        event.preventDefault();      
        dispatch(logout());     // Call logout action from authSlice   
    }

  return (
    <div className={styles.Dashboard}>
        {/* Header section */}
        <div className={styles.pageHeader}>
            <div className={styles.pageNameDiv}>
                <img src='/bg.png' alt='email flow'/>
                <p className={styles.pageName}>EmailFlow</p>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>


        {/* Main content area */}
        <section className={styles.pageContent}>
            <div className={styles.welcomeText}>
                <p className={styles.welcomeUser}>Welcome, {user.name}</p>
                <p className={styles.subtitle}>
                    Ready to automate your outreach? Create a new flowchart or view your saved sequences below.
                </p>
            </div>
        

            {/* Create new flowchart button */}
            <button 
                onClick={() => navigate('/emailFlow')} 
                className={styles.CreateFlowchartButton}
            >
                + Create New Flowchart
            </button>

            <div className={styles.flowchartListContainer}>

                {/* Flowchart list heading */}
                <div className={styles.listName}>
                    <img src='/flowchart.png' alt='flowchart'/>
                    <p>Your Email Sequences</p>
                </div>
                
                {/* Flowchart list */}
                <ul className={styles.flowchartList}>
                {flowcharts.length=== 0 && !isLoading &&  <p>You don't have any flowcharts yet.</p> }
                {isLoading && <p><Loader size={18}   className={styles.spinner}/> Loading...</p>}
                    {flowcharts.length > 0 && !isLoading && flowcharts.map((flowchart) => (
                        <li key={flowchart._id} style={{ cursor: "pointer", marginBottom: "10px" }}>
                            <span 
                                onClick={() => navigate(`/emailFlow/${flowchart._id}`)}
                                className={styles.flowchartTitle}
                            >
                                <FlowChartListItem flowchart={flowchart} />
                            </span>
                        </li>
                    ))}
                
                </ul>
            </div>
           
        </section>
    </div>
  );
};

export default Dashboard;