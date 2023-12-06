import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { UsersProvider } from './components/contexts/UsersContext';
import { TopicProvider } from './components/contexts/TopicContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UsersProvider>
        <TopicProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </TopicProvider>
    </UsersProvider >
);
