import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n'

// Simple health check endpoint for deployment verification
if (typeof window !== 'undefined' && window.location.pathname === '/health') {
  document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h1>BookMyShoot Frontend is Running</h1><p>Health check successful</p></div>'
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}