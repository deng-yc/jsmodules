export default function(initialState: any) {
    const { userId, role } = initialState;

    //各种权限管理

    return {
        canReadFoo: true,
        canUpdateFoo: role === 'admin',
        canDeleteFoo: (foo: any) => {
            return foo.ownerId === userId;
        },
    };
}
