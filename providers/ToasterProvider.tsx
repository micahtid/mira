'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
            position="bottom-left"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#F8F9FA',
                    color: '#1A1A1A',
                    border: '1px solid #E9ECEF',
                    padding: '12px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    maxWidth: '300px'
                },
                success: {
                    iconTheme: {
                        primary: '#2E7D32',
                        secondary: '#F8F9FA',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#D32F2F',
                        secondary: '#F8F9FA',
                    },
                },
                loading: {
                    iconTheme: {
                        primary: '#1976D2',
                        secondary: '#F8F9FA',
                    },
                },
            }}
            gutter={8}
            containerStyle={{
                bottom: 16,
                left: 16,
            }}
            containerClassName="animate-slide-in-right"
        />
    );
};

export default ToasterProvider;