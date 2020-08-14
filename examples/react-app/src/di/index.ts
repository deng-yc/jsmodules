import di from '@jsmodules/di';

di.Register("rxdb").value({
    name: "aaa",
    password: "123qwe",
    ignoreDuplicate: true,
    adapter: "idb",
});
