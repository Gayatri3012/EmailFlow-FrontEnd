// AskAIModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import styles from '../../styles/AiModal.module.css'

import { LoaderCircle, Sparkles } from "lucide-react";
import { generateAIResponse } from "../../utils/generateAIResponse";

const AskAIModal = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponseFromPrompt = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return alert("Please enter a prompt");
    setIsLoading(true);
    try {
        const res = await generateAIResponse({ prompt: prompt });
        setResponse(res.response);
    } catch (err) {
        alert("Failed to generate email from prompt");
    }
    setIsLoading(false);
};

  return (
    <Modal      
    isOpen={isOpen} 
    onRequestClose={onClose} 
    className={styles.modalContent}
    overlayClassName={styles.modalOverlay}
    title="Ask AI"
    >
      <form className={styles.container} onSubmit={generateAIResponseFromPrompt}>
        <h2>
            Get AI Help
        </h2>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
          rows={3}
          required
        />
          {Array.isArray(response) && response.length > 0 && (
            <div className={styles.aiResponse}>
                {response.map((sentence, index) => (
                <p key={index}>{sentence}</p>
                ))}
            </div>
        )}
        <div className={styles.modalButtons}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
            </button>
            {isLoading ? <LoaderCircle size={16} className={styles.spinner} /> :   <button type='submit' className={styles.saveButton} disabled={isLoading}>
                <Sparkles size={15}/> Ask AI
            </button>}
          
        </div>
      
      </form>
      
      
    </Modal>
  );
};

export default AskAIModal;
