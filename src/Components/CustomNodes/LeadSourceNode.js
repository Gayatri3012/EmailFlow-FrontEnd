import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/CustomNode.module.css'
  
// LeadSourceNode component represents the entry point for leads
const LeadSourceNode = ({ data, id, setSelectedNode, setIsModalOpen }) => {

    return (
      <div className={styles.CustomNode}>

        {/* No target handle — this is the starting point */}
       
        <div className={styles.nodeName}>
          <img src='/leadSource.png' alt='leadSource' className={styles.leadSourceImage}/>
          <h4>Lead Source</h4>
        </div>

        {/* Show lead source name if present */}
        {data?.leadSource && <p><strong>Source name:</strong> {data?.leadSource}</p>}

        {/* Only edit is available — no delete for starting node */}
        <div className={styles.buttonContainer}>
          <button 
            onClick={() => {
              setSelectedNode({ id, type: "leadSource", data });
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
        </div>

        {/* Outgoing connection handle */}
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  };

export default LeadSourceNode;
