import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts/nippo.css'
import './App.css'
import './i18n/config'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
