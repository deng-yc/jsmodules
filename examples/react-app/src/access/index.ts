export function accessFactory(initialState: any) {
    return {
        isLogined: initialState.logined || false,
    };
}

export type AppAccessList = ReturnType<typeof accessFactory>;
