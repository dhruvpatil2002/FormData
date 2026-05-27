
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
    <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Form controls
      </h3>

      <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
        Each row can store a label, input type, and entered value.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid gap-4">
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

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={addField}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-900"
          >
            + Add field
          </button>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-600 dark:hover:bg-teal-500 dark:focus:ring-offset-neutral-900"
          >
            Submit data
          </button>

          <button
            type="button"
            onClick={clearEntries}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-900"
          >
            Clear entries
          </button>
        </div>
      </form>
    </section>
  );
}