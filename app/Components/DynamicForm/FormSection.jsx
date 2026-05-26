
import FieldRow from './FieldRow';

export default function FormSection({
  fields,
  addField,
  removeField,
  updateField,
  handleSubmit,
  clearEntries,
}) {
  return (
    <section className="panel form-panel">
      <h3>Form controls</h3>
      <p>Each row can store a label, input type, and entered value.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-list">
          {fields.map((field, index) => (
            <FieldRow
              key={field.id}
              field={field}
              index={index}
              removeField={removeField}
              updateField={updateField}
            />
          ))}
        </div>

        <div className="action-row">
          <button type="button" className="secondary-btn" onClick={addField}>
            + Add field
          </button>

          <button type="submit" className="primary-btn">
            Submit data
          </button>

          <button type="button" className="secondary-btn" onClick={clearEntries}>
            Clear entries
          </button>
        </div>
      </form>
    </section>
  );
}