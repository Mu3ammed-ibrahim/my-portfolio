import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'; // or whatever the correct path is
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
