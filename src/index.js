import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { UsersProvider } from './components/contexts/UsersContext';
import { TopicProvider } from './components/contexts/TopicContext';
import { CommentsProvider } from './components/contexts/CommentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UsersProvider>
        <TopicProvider>
            <CommentsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CommentsProvider>
        </TopicProvider>
    </UsersProvider >
);
