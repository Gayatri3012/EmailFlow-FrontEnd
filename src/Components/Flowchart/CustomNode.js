import { Handle, Position } from '@xyflow/react';
import styles from '../../styles/CustomNode.module.css'

// ColdEmailNode component renders a node representing a cold email action
const ColdEmailNode = ({data = {}, id, setSelectedNode, setIsModalOpen, removeNode  }) =>{

    return   (<div className={styles.CustomNode}>
        {/* Incoming connection handle */}
        <Handle type="target" position={Position.Top} />

        {/* Node title and icon */}
        <div className={styles.nodeName}>
          <img src='/email.png' alt='email' className={styles.coldEmailNodeImage}/>
          <h4>Cold Email</h4>
        </div>
       
        {/* Display email details if available */}
        {data?.emailAddress && <p><strong>Email Address:</strong> {data?.emailAddress}</p>}
        {data?.subject && <p><strong>Subject:</strong> {data?.subject}</p>}
        {data?.body && <p className={styles.emailBody}><strong>Body:</strong> {data?.body}</p>}

        {/* Action buttons to edit or delete this node */}
        <div className={styles.buttonContainer}>
          <button 
            onClick={() => {
              setSelectedNode({ id, type: "coldEmail", data });
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
  </div>)
}


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
  
  export { ColdEmailNode, DelayNode, LeadSourceNode };