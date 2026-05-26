import ChartSection from './ChartSection';

export default function PreviewSection({ entries, fields, theme }) {
  const livePreviewFields = fields.filter(
    (field) => field.label.trim() || field.value.trim()
  );

  return (
    <section className="panel preview-panel">
      <h3>Real-time preview</h3>
      <p>Typed values appear instantly before and after submission.</p>

      <div className="preview-list">
        <div className="preview-card live-preview-card">
          <div className="preview-top">
            <span>Live draft preview</span>
            <small>Updates while typing</small>
          </div>

          <div className="preview-fields">
            {livePreviewFields.length === 0 ? (
              <div className="empty-box">Start typing in the form to see live preview.</div>
            ) : (
              livePreviewFields.map((item) => (
                <div
                  key={item.id}
                  className="preview-item hover-preview"
                  title={`${item.label || 'Untitled field'}: ${item.value || 'No value'}`}
                >
                  <strong>{item.label || 'Untitled field'}</strong>
                  <p>{item.value || 'No value provided'}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="empty-box">
            No submitted data yet. Add fields and submit the form.
          </div>
        ) : (
          entries.map((entry, index) => (
            <div key={entry.id} className="preview-card">
              <div className="preview-top">
                <span>Submission {index + 1}</span>
                <small>{entry.timestamp}</small>
              </div>

              <div className="preview-fields">
                {entry.fields.map((item, itemIndex) => (
                  <div
                    key={`${entry.id}-${itemIndex}`}
                    className="preview-item hover-preview"
                    title={`${item.label}: ${item.value}`}
                  >
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <ChartSection entries={entries} theme={theme} />
    </section>
  );
}