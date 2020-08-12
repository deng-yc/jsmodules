import React from 'react';
import { Redirect } from 'umi';

export default function(props: any) {
    if (true) {
        return <div className="auth-wrapper">{props.children}</div>;
    }
    return <Redirect to={'/login'} />;
}
