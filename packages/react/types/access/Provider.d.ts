import React from 'react';
interface IAccessProviderProps {
    accessFactory(initialState: any): any;
    children?: React.ReactNode;
}
export declare function AccessProvider(props: IAccessProviderProps): JSX.Element;
export {};
