// src/components/Footer.tsx

// Purpose: Serves as footer to credit Queue-Times for using their
// API service for wait times

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/60 mt-auto">
      <div className="track-divider" />
      <div className="px-6 py-8 text-center font-mono text-xs uppercase tracking-wide">
        Live wait times powered by{' '}
        <a
          href="https://queue-times.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-caution hover:underline"
        >
          Queue-Times.com
        </a>
      </div>
    </footer>
  );
}