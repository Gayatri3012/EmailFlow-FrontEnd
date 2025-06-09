import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../../styles/nodeModal.module.css";
import ColdEmailForm from "./ColdEmailForm";
import DelayForm from "./DelayForm";
import LeadSourceForm from "./LeadSourceForm";

// For accessibility: tell React Modal where the app's root is
Modal.setAppElement("#root"); 

const NodeModal = ({ isOpen, onClose, onSave, selectedNode  }) => {

    // Helper function: returns default form structure based on node type
    const getDefaultFormData = (type) => {
        switch (type) {
          case "coldEmail":
            return { emailAddress: "", subject: "", body: "" };
          case "delay":
            return { delayTime: "" };
          case "leadSource":
            return { leadSource: "" };
          default:
            return {};
        }
    };

    // Form data state for input fields
    const [formData, setFormData] = useState(getDefaultFormData(selectedNode?.type || ""));
 

    // When selectedNode changes, update form data (used when editing an existing node)
    useEffect(() => {
        if (selectedNode.data) {
            setFormData(selectedNode.data || getDefaultFormData(selectedNode.type));
        }
    }, [selectedNode]);

    // Update form data when input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // When user clicks Save
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);   // Save data back to parent component
        onClose();          // Close modal
    };


    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >

        {/* Dynamic title based on node type */}
        <h2>
            {selectedNode?.type === "coldEmail" ? "Cold Email Node" : selectedNode?.type === "delay" ? "Wait/Delay Node" : "Lead Source Node"}
        </h2>
        
        <form className={styles.modalForm} onSubmit={handleSubmit}>

            {/* Cold Email form inputs */}
            {selectedNode?.type === "coldEmail" && <ColdEmailForm formData={formData} setFormData={setFormData} />}

            {/* Delay Node input */}
            {selectedNode?.type === "delay" && <DelayForm formData={formData} handleChange={handleChange} />}

            {/* Lead Source Node input */}
            {selectedNode?.type === "leadSource" && <LeadSourceForm formData={formData} handleChange={handleChange} />}

            {/* Save / Cancel buttons */}
            <div className={styles.modalButtons}>
          
            <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
                Save
            </button>
            </div>
        </form>
        </Modal>
    );
};

export default NodeModal;
