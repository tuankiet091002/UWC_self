import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { AuthContextProvider } from './contexts/AuthContext';
import { EmpContextProvider } from './contexts/EmpContext';
import { TruckContextProvider } from './contexts/TruckContext';
import { MCPContextProvider } from './contexts/MCPContext';
import { ChatContextProvider } from './contexts/ChatContext';
import { TaskContextProvider } from './contexts/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <AuthContextProvider>
            <EmpContextProvider>
                <TruckContextProvider>
                    <MCPContextProvider>
                        <TaskContextProvider>
                            <ChatContextProvider>
                                <App />
                            </ChatContextProvider>
                        </TaskContextProvider>
                    </MCPContextProvider>
                </TruckContextProvider>
            </EmpContextProvider>
        </AuthContextProvider>
    </React.Fragment>
);


