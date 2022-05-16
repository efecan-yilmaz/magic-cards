import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState<string | null>(() => {
        return localStorage.getItem('magic-cards-token');
    });

    interface ISetToken {
        (newToken: string): void;
    }

    const setToken: ISetToken = (newToken: string): void => {
        localStorage.setItem('magic-cards-token', newToken);
        setTokenInternal(newToken);
    };

    return [token, setToken] as const;
}