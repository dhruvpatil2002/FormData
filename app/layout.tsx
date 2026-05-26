import './globals.css';

export const metadata = {
  title: 'Dynamic Form App',
  description: 'Dynamic form with live preview',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}