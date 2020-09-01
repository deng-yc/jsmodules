import html2canvas from 'html2canvas';
import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';

interface IViewShotProps {
    children?: any;
}

const ViewShotImpl = (props: IViewShotProps, ref: any) => {
    const viewRef = useRef<HTMLDivElement>(null);

    const urlRef = useRef<string>();

    const revokeObjectURL = useCallback(() => {
        if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
            urlRef.current = "";
        }
    }, []);
    const canvasToBlob = useCallback((canvas: HTMLCanvasElement) => {
        return new Promise((res) => {
            canvas.toBlob(
                (blob: any) => {
                    res(blob);
                },
                "image/png",
                1
            );
        });
    }, []);

    useImperativeHandle(ref, () => {
        return {
            capture() {
                revokeObjectURL();
                if (viewRef.current) {
                    return html2canvas(viewRef.current as any, { useCORS: true })
                        .then(canvasToBlob)
                        .then((b) => {
                            urlRef.current = URL.createObjectURL(b);
                            return urlRef.current;
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
export const ViewShot = React.forwardRef<{ capture: () => Promise<any> }>(ViewShotImpl);
export default ViewShot;
