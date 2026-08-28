"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const LoadingContext = createContext({ isReady: false });

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isHiding, setIsHiding] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const hide = () => {
            setIsHiding(true);
            setIsReady(true); // start hero animations as loading screen fades out
            setTimeout(() => setIsLoading(false), 550);
        };

        if (document.readyState === 'complete') {
            hide();
        } else {
            window.addEventListener('load', hide, { once: true });
            return () => window.removeEventListener('load', hide);
        }
    }, []);

    return (
        <LoadingContext.Provider value={{ isReady }}>
            {isLoading && <LoadingScreen isHiding={isHiding} />}
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
