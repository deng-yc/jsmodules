import html2canvas from 'html2canvas';
import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';

interface IViewShotProps {
    children?: any;
}

export const ViewShot = (props: IViewShotProps, ref: any) => {
    const viewRef = useRef<HTMLDivElement>(null);

    const urlRef = useRef<string>();

    const revokeObjectURL = useCallback(() => {
        if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
            urlRef.current = "";
        }
    }, []);

    useImperativeHandle(ref, () => {
        return {
            capture() {
                revokeObjectURL();
                if (viewRef.current) {
                    return html2canvas(viewRef.current as any, { useCORS: true })
                        .then((canvas) => {
                            return new Promise((resolve) => {
                                canvas.toBlob((b) => {
                                    resolve(b);
                                }, "image/png");
                            });
                        })
                        .then((b) => {
                            urlRef.current = URL.createObjectURL(b);
                            return URL.createObjectURL(b);
                        });
                }
                return Promise.resolve(null);
            },
        };
    });

    useEffect(() => {
        return () => {
            revokeObjectURL();
        };
    }, [revokeObjectURL]);

    return <div ref={viewRef}>{props.children}</div>;
};

export default React.forwardRef<{ capture: () => Promise<any> }>(ViewShot);
