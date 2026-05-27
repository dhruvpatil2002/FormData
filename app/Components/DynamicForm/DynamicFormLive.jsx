'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import StatsCards from './StatsCards';
import FormSection from './FormSection';
import PreviewSection from './PreviewSection';

const createField = (id, label = '', type = 'text', value = '', isRemoving = false) => ({
  id,
  label,
  type,
  value,
  isRemoving,
});

export default function DynamicFormLive() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fields, setFields] = useState([createField(1, 'Full name')]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'light'
        : 'dark';
      setTheme(systemTheme);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, mounted]);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      createField(Date.now() + Math.random(), '', 'text', '', false),
    ]);
  };

  const removeField = (id) => {
    if (fields.length === 1) return;

    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, isRemoving: true } : field
      )
    );

    setTimeout(() => {
      setFields((prev) => prev.filter((field) => field.id !== id));
    }, 250);
  };

  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, [key]: value, ...(key === 'type' ? { value: '' } : {}) }
          : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validFields = fields.filter(
      (field) => field.label.trim() || field.value.trim()
    );

    if (!validFields.length) return;

    const submission = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      fields: validFields.map((field) => ({
        label: field.label.trim() || 'Untitled field',
        type: field.type,
        value: field.value.trim() || 'No value provided',
      })),
    };

    setEntries((prev) => [submission, ...prev]);
  };

  const clearEntries = () => setEntries([]);

  const filledCount = useMemo(
    () => fields.filter((field) => field.value.trim()).length,
    [fields]
  );

  const completionRate = useMemo(() => {
    if (!fields.length) return 0;
    return Math.round((filledCount / fields.length) * 100);
  }, [filledCount, fields.length]);

  return (
    <main className="page-shell">
      <Header theme={theme} setTheme={setTheme} mounted={mounted} />

      <section className="hero-grid">
        <div className="panel hero-copy">
          <span className="eyebrow">Responsive form builder</span>
          <h1>Dynamic input fields with live screen updates.</h1>
          <p>Add fields, remove fields, submit data, and see everything render instantly.</p>
        </div>

        <StatsCards
          fieldsCount={fields.length}
          entriesCount={entries.length}
          filledCount={filledCount}
          completionRate={completionRate}
        />
      </section>

      <section className="content-grid">
        <FormSection
          fields={fields}
          addField={addField}
          removeField={removeField}
          updateField={updateField}
          handleSubmit={handleSubmit}
          clearEntries={clearEntries}
        />

        <PreviewSection entries={entries} fields={fields} theme={theme} />
      </section>
    </main>
  );
}