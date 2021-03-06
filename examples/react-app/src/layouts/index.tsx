import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Redirect, RouteComponentProps, useLocation } from 'react-router-dom';

import { useAuthenticated } from '@jsmodules/react';

interface ILayoutProps extends RouteComponentProps {
    children: any;
    route?: any;
}

export const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
    const { route } = props;
    const location = useLocation();
    const { isAuthenticated } = useAuthenticated();

    if (!isAuthenticated) {
        const next = location.pathname + location.search;
        return <Redirect to={`/login?next=${encodeURIComponent(next)}`} push={false} />;
    }
    return <>{renderRoutes(route.routes)}</>;
};

export default Layout;
