export function accessFactory(initialState: any) {
    return {
        isAuthenticated: initialState.isAuthenticated || false,
    };
}

export type AppAccessList = ReturnType<typeof accessFactory>;
