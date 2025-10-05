import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the entire app in the BrowserRouter */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
