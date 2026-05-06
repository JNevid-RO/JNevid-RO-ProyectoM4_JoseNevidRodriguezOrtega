import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Task manager</h1>
        <p>Aplicación inicial en React + TypeScript</p>
      </header>
      <main className="app-main">
        <button onClick={() => setCount((value) => value + 1)}>
          Clicks: {count}
        </button>
      </main>
    </div>
  );
}

export default App;
