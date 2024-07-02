export declare class InternalEncrypt {
    private xor;
    private hex;
    constructor(xor?: number, hex?: number);
    /**
     * encrypto 加密程序
     * @param {Strng} str 待加密字符串
     * @param {Number} xor 异或值
     * @param {Number} hex 加密后的进制数
     * @return {Strng} 加密后的字符串
     */
    private encrypto;
    /**
     * decrypto 解密程序
     * @param {Strng} str 待加密字符串
     * @param {Number} xor 异或值
     * @param {Number} hex 加密后的进制数
     * @return {Strng} 加密后的字符串
     */
    private decrypto;
    decode(str: any): any;
    encode(obj: any): string;
}
//# sourceMappingURL=InternalEncrypt.d.ts.map