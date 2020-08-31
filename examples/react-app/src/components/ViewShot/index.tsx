import html2canvas from 'html2canvas';
import React, { useImperativeHandle, useRef } from 'react';

interface IViewShotProps {
    children?: any;
}

export const ViewShot = (props: IViewShotProps, ref: any) => {
    const viewRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
        return {
            capture() {
                if (viewRef.current) {
                    return html2canvas(viewRef.current);
                }
                return Promise.resolve(null);
            },
        };
    });

    return <div ref={viewRef}>{props.children}</div>;
};

export default React.forwardRef<{ capture: () => Promise<any> }>(ViewShot);
