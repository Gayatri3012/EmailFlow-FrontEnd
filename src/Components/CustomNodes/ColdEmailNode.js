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

        <div>
          {/* Display email details if available */}
          {data?.emailAddress && <p><strong>Email Address:</strong> {data?.emailAddress}</p>}
          {data?.subject && <p><strong>Subject:</strong> {data?.subject}</p>}
          {/* {data?.body && <p className={styles.emailBody}><strong>Body:</strong> {data?.body}</p>} */}
        </div>
       
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

export default ColdEmailNode;
