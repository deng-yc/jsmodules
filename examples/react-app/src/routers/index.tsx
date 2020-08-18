import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import { routers } from './config';

export function AppRoutes() {
    return <BrowserRouter>{renderRoutes(routers)}</BrowserRouter>;
}
