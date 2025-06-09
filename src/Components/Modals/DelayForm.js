const DelayForm = ({ formData, handleChange }) => (
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
);

export default DelayForm;