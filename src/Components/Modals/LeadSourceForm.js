const LeadSourceForm = ({ formData, handleChange }) => (
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
);

export default LeadSourceForm;
