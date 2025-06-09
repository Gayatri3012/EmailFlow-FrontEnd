import React, { useState } from "react";
import styles from "../../styles/nodeModal.module.css";
import { generateEmail } from "../../utils/generateEmail";
import { Bot, LoaderCircle, PencilLine } from "lucide-react";

const EMAIL_CATEGORIES = [
    "Sales Outreach",
    "Follow-up",
    "Networking",
    "Product Launch",
    "Event Invitation",
    "Feedback Request",
    "Partnership Proposal",
    "Hiring Outreach",
    "Customer Retention",
    "Content Promotion",
  ];

const ColdEmailForm = ({ formData, setFormData }) => {
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('write')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateEmailFromCategory = async () => {
        setIsLoading(true);
        if (!category) {
            setIsLoading(false);
            return alert("Please select a category");
        }
        try {
            const { subject, body } = await generateEmail({ category });
            console.log(subject, body);
            setFormData({ ...formData, subject, body });
        } catch (err) {
            alert("Failed to generate email from category");
        }
        setIsLoading(false);
    };


  return (
    <>
        {/* Mode Selection Tiles */}
        <div className={styles.tileContainer}>
            <div
            className={`${styles.tile} ${mode === "write" ? styles.active : ""}`}
            onClick={() => setMode("write")}
            >
            <PencilLine size={20} /> Write 
            </div>
            <div
            className={`${styles.tile} ${mode === "ai" ? styles.active : ""}`}
            onClick={() => setMode("ai")}
            >
            <Bot size={20}/> AI Assist
            </div>
        </div>

        {mode === "ai" && (<div className={styles.emailSection}> 
            {/* Category Selection + Generate Email */}
        <div className={styles.categorySection}>
            <label>
                Select Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">-- Choose --</option>
                    {EMAIL_CATEGORIES.map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })}
                </select>
            </label>
                        
            <button type="button" onClick={generateEmailFromCategory} className={styles.generateEmailButton} disabled={isLoading}>
                {isLoading && <LoaderCircle size={18} className={styles.spinner}/> }
                {!isLoading && <span>Generate Email</span>}
            </button>
        </div>   

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
        
        </div>)}
       
       {mode === 'write' && (<div className={styles.emailSection}>
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
       </div>)}
       
    </>
  );
};

export default ColdEmailForm;