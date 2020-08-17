import React from 'react';
interface IAppProviderProps {
    getInitialState: () => Promise<any>;
    children?: React.ReactNode;
}
export declare function AppProvider(props: IAppProviderProps): JSX.Element;
export {};
