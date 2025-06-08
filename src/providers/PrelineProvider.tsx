import React, { createContext, useContext } from 'react';
import { PrelineContextValue } from '../types';
import usePreline from '../hooks/usePreline';

const PrelineContext = createContext<PrelineContextValue | undefined>(undefined);

export const usePrelineContext = () => {
	const context = useContext(PrelineContext);
	if (context === undefined) {
		throw new Error('usePrelineContext must be used within a PrelineProvider');
	}
	return context;
};

interface PrelineProviderProps {
	children: React.ReactNode;
}

const PrelineProvider: React.FC<PrelineProviderProps> = ({ children }) => {
	const prelineState = usePreline();

	return <PrelineContext.Provider value={prelineState}>{children}</PrelineContext.Provider>;
};

export default PrelineProvider;
