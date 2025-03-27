import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css' // Example global stylesheet

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)