import React, { useImperativeHandle, useRef } from 'react';
import { View, ViewProps } from 'react-native';

interface IViewShotProps extends ViewProps {
    children?: any;
}

const ViewShotImpl = (props: IViewShotProps, ref: any) => {
    const viewRef = useRef<View>(null);
    useImperativeHandle(ref, () => {
        return {
            capture() {
                if (viewRef.current) {
                    //TODO:实现RN截图
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

export const ViewShot = React.forwardRef<ViewShotRef, IViewShotProps>(ViewShotImpl);

export default ViewShot;
