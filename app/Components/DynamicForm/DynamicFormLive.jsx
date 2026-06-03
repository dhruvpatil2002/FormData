'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './Header';
import StatsCards from './StatsCards';
import FormSection from './FormSection';
import PreviewSection from './PreviewSection';

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createField = (
  id,
  label = '',
  type = 'text',
  value = '',
  isRemoving = false
) => ({
  id,
  label,
  type,
  value,
  isRemoving,
});

export default function DynamicFormLive() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fields, setFields] = useState([createField(createId(), '')]);
  const [entries, setEntries] = useState([]);
  const removeTimers = useRef(new Map());

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const initialTheme = media.matches ? 'dark' : 'light';
    setTheme(initialTheme);

    return () => {
      removeTimers.current.forEach((timer) => clearTimeout(timer));
      removeTimers.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [mounted, theme]);

  const addField = useCallback(() => {
    setFields((prev) => [...prev, createField(createId())]);
  }, []);

  const removeField = useCallback((id) => {
    setFields((prev) => {
      if (prev.length === 1) return prev;

      return prev.map((field) =>
        field.id === id ? { ...field, isRemoving: true } : field
      );
    });

    const timer = setTimeout(() => {
      setFields((prev) => {
        if (prev.length === 1) return prev.filter((field) => field.id !== id) || prev;
        return prev.filter((field) => field.id !== id);
      });
      removeTimers.current.delete(id);
    }, 250);

    removeTimers.current.set(id, timer);
  }, []);

  const updateField = useCallback((id, key, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              [key]: value,
              ...(key === 'type' ? { value: '' } : {}),
            }
          : field
      )
    );
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const validFields = fields
      .map((field) => ({
        label: field.label.trim(),
        type: field.type,
        value: String(field.value).trim(),
      }))
      .filter((field) => field.label || field.value);

    if (!validFields.length) return;

    const submission = {
      id: createId(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      fields: validFields.map((field) => ({
        label: field.label || 'Untitled field',
        type: field.type,
        value: field.value || 'No value provided',
      })),
    };

    setEntries((prev) => [submission, ...prev]);

    setFields((prev) =>
      prev.map((field, index) =>
        index === 0
          ? { ...field, value: '' }
          : { ...field, label: '', type: 'text', value: '', isRemoving: false }
      )
    );
  }, [fields]);

  const clearEntries = useCallback(() => {
    setEntries([]);
  }, []);

  const filledCount = useMemo(
    () => fields.filter((field) => String(field.value).trim()).length,
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
          <p>
            Add fields, remove fields, submit data, and see everything render
            instantly.
          </p>
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