import { Application, sleepAsync } from '@jsmodules/core';

//获取APP初始化状态数据
export async function getInitialState() {
    return Application.use(async () => {
        console.log('5秒后下一步');
        await sleepAsync(5000);
        return {
            user: 1,
        };
    })
        .use(() => {
            return { role: 1 };
        })
        .initAsync();
}
