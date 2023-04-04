import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { AuthContextProvider } from './contexts/AuthContext';
import { EmpContextProvider } from './contexts/EmpContext';
import { TruckContextProvider } from './contexts/TruckContext';
import { MCPContextProvider } from './contexts/MCPContext';
// import { TaskContextProvider } from './contexts/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <AuthContextProvider>
            <EmpContextProvider>
                <TruckContextProvider>
                    <MCPContextProvider>
                        <App />
                    </MCPContextProvider>
                </TruckContextProvider>
            </EmpContextProvider>
        </AuthContextProvider>
    </React.Fragment>
);


