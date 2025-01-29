import Navbar from '@/components/Navbar';
import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="auth-layout">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;