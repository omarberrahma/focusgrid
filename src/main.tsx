import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'\n\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/sw.js').catch(error => console.error('FocusGrid service worker registration failed:', error))\n  })\n}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
