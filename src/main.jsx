import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import Testing from '../text.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Testing />
  </StrictMode>,
)
