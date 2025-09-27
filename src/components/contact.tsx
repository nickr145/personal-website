// src/components/Contact.tsx
import Card from './Card';

export function Contact() {
  return (
    <Card title="Contact">
      <p>Want to collaborate or chat about a project? Reach out anytime.</p>
      <div style={{ marginTop: '1.5em', display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
        <a href="mailto:nicholas.rebello@gmail.com">Email me</a>
        <a href="https://www.linkedin.com/in/nicholas-rebello-82609112b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/nickr145" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </Card>
  );
}
