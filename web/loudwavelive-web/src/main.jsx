import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(
    document.getElementById('root')
).render(

    <GoogleOAuthProvider
        clientId="1058903983016-v7old5bg1q1pp3m3utvr99882coik25u.apps.googleusercontent.com"
    >
      <BrowserRouter>
        <App />
        </BrowserRouter>
    </GoogleOAuthProvider>
)

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// )
