import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../../styles/nodeModal.module.css";

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
        
        <form onSubmit={handleSubmit}>

            {/* Cold Email form inputs */}
            {selectedNode?.type === "coldEmail" && (
                <>
                    <label>
                        Email Address:
                        <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Subject:
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Body:
                        <textarea
                            name="body"
                            value={formData.body ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </>
            )}

            {/* Delay Node input */}
            {selectedNode?.type === "delay" && (
                <label>
                    Duration (in hours):
                    <input
                        type="number"
                        name="delayTime"
                        value={formData.delayTime ?? ""}
                        onChange={handleChange}
                        required
                    />
                </label>
            )}

            {/* Lead Source Node input */}
            {selectedNode?.type === "leadSource" && (
                <>
                    <label>
                        Source Name:
                        <input
                            type="text"
                            name="leadSource"
                            value={formData.leadSource ?? ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </>
            )}

            {/* Save / Cancel buttons */}
            <div className={styles.modalButtons}>
            <button type="submit" className={styles.saveButton}>
                Save
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
            </button>
            </div>
        </form>
        </Modal>
    );
};

export default NodeModal;
