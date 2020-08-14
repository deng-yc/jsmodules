import * as React from 'react';

import { guid } from '@jsmodules/idgenerator';

const cachedComponents: any = {};

type AsyncComponentStatus = 'loading' | 'success' | 'fail';

/**
 * 异步请求组件
 */
export function AsyncComponent(importComponent: any) {
    const cachedKey = `lazy-${guid()}`;
    return function AsyncComponent(props: any) {
        let CachedComponent = cachedComponents[cachedKey];
        const [status, setStatus] = React.useState<AsyncComponentStatus>(() => {
            let initialStatus: AsyncComponentStatus = !!CachedComponent
                ? 'success'
                : 'loading';
            return initialStatus;
        });

        const retry = () => {
            if (status != 'success') {
                importComponent()
                    .then((module: any) => {
                        cachedComponents[cachedKey] = module.default || module;
                        setStatus('success');
                    })
                    .catch(() => {
                        setStatus('fail');
                    });
            }
        };

        React.useEffect(() => {
            retry();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        if (status == 'loading') {
            return (
                <>
                    <div className="async-loading"></div>
                </>
            );
        }
        if (status == 'fail') {
            return (
                <>
                    <div className="async-loading">fail</div>
                </>
            );
        }
        return <CachedComponent {...props} />;
    };
}

export default AsyncComponent;
