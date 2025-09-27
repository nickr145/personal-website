// src/components/About.tsx
import Card from './Card';

export function About() {
  return (
    <Card title="About" style={{ maxWidth: 350 }}>
      <p>
        I’m a CS + Business student who enjoys building products end-to-end—from ideation and design to performant
        implementations. I’ve worked with SwiftUI, TypeScript, Preact/React, and enjoy shipping tiny, fast UIs.
      </p>
      <ul style={{ marginTop: '1.5em', marginBottom: 0, paddingLeft: '1.2em' }}>
        <li>💡 Product thinking & rapid prototyping</li>
        <li>⚙️ TypeScript, Preact/React, SwiftUI</li>
        <li>📈 Interest in AI/ML + fintech</li>
        <li>🧪 Testing and performance budgets</li>
      </ul>
    </Card>
  );
}
