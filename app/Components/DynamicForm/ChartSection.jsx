import { useMemo } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ChartSection({ entries, theme }) {
  const chartData = useMemo(() => {
    const css =
      typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement)
        : null;

    const primary = css?.getPropertyValue('--color-primary').trim() || '#01696f';
    const fill =
      css?.getPropertyValue('--color-primary-highlight').trim() || '#d9ebea';

    return {
      labels: entries.map((_, index) => `#${index + 1}`),
      datasets: [
        {
          label: 'Character count',
          data: entries.map((entry) =>
            entry.fields.reduce((sum, field) => sum + String(field.value).length, 0)
          ),
          backgroundColor: fill,
          borderColor: primary,
          borderWidth: 1.5,
          borderRadius: 10,
          hoverBackgroundColor: primary,
        },
      ],
    };
  }, [entries, theme]);

  const chartOptions = useMemo(() => {
    const css =
      typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement)
        : null;

    const primary = css?.getPropertyValue('--color-primary').trim() || '#01696f';
    const divider = css?.getPropertyValue('--color-divider').trim() || '#dcd9d5';
    const muted = css?.getPropertyValue('--color-text-muted').trim() || '#6f6b62';

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: primary,
          titleColor: '#fff',
          bodyColor: '#fff',
          displayColors: false,
          callbacks: {
            label: (context) => `${context.raw} typed characters`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: muted },
        },
        y: {
          beginAtZero: true,
          grid: { color: divider },
          ticks: { color: muted, precision: 0 },
        },
      },
    };
  }, [theme]);

  return (
    <div className="chart-card">
      <h3>Entry overview</h3>
      <p>Hover or tap bars to inspect character counts.</p>

      <div className="chart-box">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}