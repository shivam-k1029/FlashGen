import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Entry point: This file starts the React application
// It finds the 'root' element in HTML and renders the App component inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* App component is the main application */}
    <App />
  </StrictMode>,
)
