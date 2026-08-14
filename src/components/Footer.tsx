export default function Footer() {
  return (
    <footer
      style={{
        padding: '2rem',
        marginTop: '3rem',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#666',
      }}
    >
      Live wait times powered by{' '}
      <a
        href="https://queue-times.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#666', textDecoration: 'underline' }}
      >
        Queue-Times.com
      </a>
    </footer>
  );
}