import React, { useContext, createContext, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import zIndex from '@mui/material/styles/zIndex';

interface IIndicatorContext {
    showIndicator: boolean;
    setShowIndicator: (show: boolean) => void;
}

const IndicatorContext = createContext<IIndicatorContext>({} as IIndicatorContext);

export const useIndicator = () => (useContext(IndicatorContext));

interface IProps {
    children: React.ReactNode;
}

const IndicatorProvider: React.FC<IProps> = ({ children }) => {
    const [showIndicator, setShowIndicator] = useState<boolean>(false);

    return (
        <IndicatorContext.Provider value={{ showIndicator, setShowIndicator }}>
            {showIndicator ? <Box sx={{ position: 'absolute', top: 0, display: 'flex', height: '100vh', width:'100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(178, 235, 242, 0.5)', zIndex: '99999'}}>
                <CircularProgress />
            </Box> : ''}
            {children}
        </IndicatorContext.Provider>
    )
}

export default IndicatorProvider;