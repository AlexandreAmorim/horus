import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { HttpProvider } from './http';

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return (
        <AuthProvider>
            <HttpProvider>
                {children}
            </HttpProvider>
        </AuthProvider>
    )
}

export { AppProvider };