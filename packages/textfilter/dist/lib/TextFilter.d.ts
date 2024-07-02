export declare class TextFilter {
    private tree;
    private words;
    constructor();
    /**
     * 导出关键字树
     */
    export(): {
        tree: {};
        words: {};
    };
    /**
     * 导入关键字树
     * @param tree
     */
    import(data: any): void;
    /**
     * 清空所有关键字
     */
    clear(): this;
    /**
     * 添加关键字
     * @param words 关键字数组
     */
    addWords(words: string[]): this;
    /**
     * 删除关键字
     * @param words 关键字数组
     */
    removeWords(words: string[]): this;
    /**
     * 添加关键字
     * @param word 关键字
     */
    addWord(word: string): this;
    /**
     * 删除关键字
     * @param word 关键字数组
     */
    removeWord(word: string): this;
    private _find;
    /**
     * 是否命中任何关键字,命中第一个时候会停止查找
     * @param str 要匹配的字符串
     */
    has(str: any): boolean;
    /**
     * 查询所有命中的关键字
     * @param str
     */
    findAll(str: any): any[];
}
//# sourceMappingURL=TextFilter.d.ts.map