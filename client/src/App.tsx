// Remove the line below:
// import React from 'react';
import TrackListPage from '@/pages/TrackListPage'; // Using path alias
import './styles/App.css'; // Example App specific styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Track Manager</h1>
      </header>
      <main>
        <TrackListPage />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Name/Company</p>
      </footer>
    </div>
  );
}

export default App;