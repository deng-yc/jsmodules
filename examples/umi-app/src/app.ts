export const ssr = {
  modifyGetInitialPropsCtx: async (ctx: any) => {
    ctx.title = 'params';
    return ctx;
  },
};
