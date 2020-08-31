import html2canvas from 'html2canvas';
import React, { useImperativeHandle, useRef } from 'react';
import { View, ViewProps } from 'react-native';

interface IViewShotProps extends ViewProps {
    children?: any;
}

export const ViewShot = (props: IViewShotProps, ref: any) => {
    const viewRef = useRef<View>(null);
    useImperativeHandle(ref, () => {
        return {
            capture() {
                if (viewRef.current) {
                    return html2canvas(viewRef.current as any).then((canvas) => {
                        const imageUrl = canvas.toDataURL("image/png");
                        console.log(imageUrl);
                        return imageUrl;
                    });
                }
                return Promise.resolve(null);
            },
        };
    });

    return (
        <View ref={viewRef} {...props}>
            {props.children}
        </View>
    );
};
export type ViewShotRef = {
    capture: () => Promise<any>;
};

export default React.forwardRef<ViewShotRef, IViewShotProps>(ViewShot);
