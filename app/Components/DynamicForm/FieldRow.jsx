export default function FieldRow({ field, index, removeField, updateField }) {
  return (
    <div className={`field-card field-animate ${field.isRemoving ? 'field-removing' : ''}`}>
      <div className="field-top">
        <span>Field {index + 1}</span>

        <button
          type="button"
          className="danger-btn"
          onClick={() => removeField(field.id)}
        >
          Remove
        </button>
      </div>

      <div className="field-grid">
        <label>
          Field label
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, 'label', e.target.value)}
            placeholder="Example: Full name"
          />
        </label>

        <label>
          Field type
          <select
            value={field.type}
            onChange={(e) => updateField(field.id, 'type', e.target.value)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </label>

        <label>
          Value
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => updateField(field.id, 'value', e.target.value)}
            placeholder={field.type === 'date' ? '' : 'Enter value'}
          />
        </label>
      </div>
    </div>
  );
}