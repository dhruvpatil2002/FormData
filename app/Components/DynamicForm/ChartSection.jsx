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

function getThemeColors() {
  if (typeof window === 'undefined') {
    return {
      primary: '#01696f',
      fill: '#d9ebea',
      divider: '#dcd9d5',
      muted: '#6f6b62',
    };
  }

  const css = getComputedStyle(document.documentElement);

  return {
    primary: css.getPropertyValue('--color-primary').trim() || '#01696f',
    fill:
      css.getPropertyValue('--color-primary-highlight').trim() || '#d9ebea',
    divider: css.getPropertyValue('--color-divider').trim() || '#dcd9d5',
    muted: css.getPropertyValue('--color-text-muted').trim() || '#6f6b62',
  };
}

export default function ChartSection({ entries = [], theme }) {
  const colors = useMemo(() => getThemeColors(), [theme]);

  const chartValues = useMemo(() => {
    return entries.map((entry) =>
      entry.fields.reduce(
        (sum, field) => sum + String(field?.value ?? '').length,
        0
      )
    );
  }, [entries]);

  const chartData = useMemo(() => {
    return {
      labels: entries.map((entry, index) => entry.timestamp || `#${index + 1}`),
      datasets: [
        {
          label: 'Character count',
          data: chartValues,
          backgroundColor: colors.fill,
          borderColor: colors.primary,
          borderWidth: 1.5,
          borderRadius: 10,
          borderSkipped: false,
          hoverBackgroundColor: colors.primary,
          maxBarThickness: 48,
        },
      ],
    };
  }, [entries, chartValues, colors]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: colors.primary,
          titleColor: '#fff',
          bodyColor: '#fff',
          displayColors: false,
          callbacks: {
            title: (context) => `Entry ${context[0].dataIndex + 1}`,
            label: (context) => `${context.raw} typed characters`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: colors.muted,
            maxRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: colors.divider,
          },
          ticks: {
            color: colors.muted,
            precision: 0,
            stepSize: 1,
          },
        },
      },
    };
  }, [colors]);

  const hasData = entries.length > 0;

  return (
    <div className="chart-card">
      <h3>Entry overview</h3>
      <p>
        {hasData
          ? 'Hover or tap bars to inspect character counts.'
          : 'Submit entries to see character counts appear here.'}
      </p>

      <div className="chart-box">
        {hasData ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <div className="chart-empty">No entry data available yet.</div>
        )}
      </div>
    </div>
  );
}