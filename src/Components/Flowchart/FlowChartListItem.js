import { AlarmClockCheck, Check, Pencil } from 'lucide-react';
import styles from '../../styles/Dashboard.module.css'

const FlowChartListItem = ({ flowchart }) => {
    return (
        <div className={styles.flowchartCard}>
            <div className={styles.cardHeader}>
                <h3>{flowchart.title || "Untitled Flowchart"}</h3>
                <span className={`${styles.statusBadge} ${styles[flowchart.status]}`}>
                    {flowchart.status === 'saved' ? <Check size={15}/> : <AlarmClockCheck size={15}/>}
                    {flowchart.status}
                </span>
            </div>
            <p className={styles.createdDate}>
                Created: {new Date(flowchart.createdAt).toLocaleDateString()}
            </p>
            <button className={styles.editBtn}><Pencil size={12} />Edit</button>
        </div>
    )
}

export default FlowChartListItem;
