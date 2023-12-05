import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { UsersProvider } from './components/contexts/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UsersProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UsersProvider>
);
