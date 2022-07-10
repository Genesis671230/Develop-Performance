import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  AuthorizationContextProvider } from './context/AuthContext';
import {  SearchContextProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
    <SearchContextProvider>
    <App />
    </SearchContextProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>
);
