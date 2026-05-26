

export default function StatsCards({
  fieldsCount,
  entriesCount,
  filledCount,
  completionRate,
}) {
  const stats = [
    { label: 'Active fields', value: fieldsCount },
    { label: 'Submitted entries', value: entriesCount },
    { label: 'Filled values', value: filledCount },
    { label: 'Completion', value: `${completionRate}%` },
  ];

  return (
    <aside className="panel stats-panel">
      <h3>Live activity</h3>
      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.label} className="stat-card">
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}