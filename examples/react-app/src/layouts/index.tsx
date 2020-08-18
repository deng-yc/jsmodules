import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { AppAccessList } from '@/access';
import { useAccess } from '@jsmodules/react';

interface ILayoutProps {
    children: any;
}

export const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
    const location = useLocation();
    const { isAuthenticated } = useAccess<AppAccessList>();

    if (!isAuthenticated) {
        const next = location.pathname + location.search;
        return <Redirect to={`/login?next=${encodeURIComponent(next)}`} />;
    }
    return <>{props.children}</>;
};

export default Layout;
