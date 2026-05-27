export default function Header({ theme, setTheme, mounted }) {
  return (
    <header className="panel topbar">
      <div>
        <h2 className="brand-title">Dynamic Form Live</h2>
        <p className="brand-subtitle">Add, remove, and preview fields in real time.</p>
      </div>

      <button
        type="button"
        className="icon-btn"
        onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        title="Toggle theme"
        aria-label="Toggle theme"
      >
        {mounted ? (theme === 'dark' ? ' ☾' : '☀') : '◐'}
      </button>
    </header>
  );
}