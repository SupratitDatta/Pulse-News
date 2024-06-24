import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewsProvider from './utils/NewsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NewsProvider>
      <App />
    </NewsProvider>
  </React.StrictMode>
);
