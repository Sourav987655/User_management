import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Includes global styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Creating a wrapper for global layout (optional)
const RootLayout = () => {
  return (
    <>
      <header>
        Welcome to My Application
      </header>
      <div className="main-container">
        <App />
      </div>
      <footer>
        © 2024 Management Application | All Rights Reserved
      </footer>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootLayout />
  </React.StrictMode>
);

// For performance measuring
reportWebVitals(console.log);
