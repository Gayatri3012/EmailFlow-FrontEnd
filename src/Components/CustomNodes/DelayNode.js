import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/CustomNode.module.css'



// DelayNode component renders a wait/delay step in the sequence
const DelayNode = ({ data ={}, id, setSelectedNode, setIsModalOpen, removeNode }) => {

    return (
      <div className={styles.CustomNode}>
        <Handle type="target" position={Position.Top} />
      
        {/* Node title and icon */}
        <div className={styles.nodeName}>
          <img src='/wait.png' alt='wait' className={styles.waitNodeImage}/>
          <h4>Wait/Delay</h4>
        </div>

        {/* Display delay time if available */}
        {data?.delayTime && <p><strong>Delay Time:</strong> {data?.delayTime} hours</p>}

        {/* Action buttons */}
        <div className={styles.buttonContainer}>
          <button 
            onClick={() => {
              setSelectedNode({ id, type: "delay", data });
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
          <button 
            onClick={() => {
              removeNode(id)
            }}
          >
            Delete
          </button>
        </div>
            
        {/* Outgoing connection handle */}
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
};

export default DelayNode;