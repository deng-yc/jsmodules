export class TextFilter {
    private tree = {};
    private words = {};
    constructor() {}
    /**
     * 导出关键字树
     */
    export() {
        return this.tree;
    }

    /**
     * 导入关键字树
     * @param tree
     */
    import(tree) {
        this.tree = tree;
    }

    /**
     * 清空所有关键字
     */
    clear() {
        this.tree = {};
        this.words = {};
        return this;
    }

    /**
     * 添加关键字
     * @param words 关键字数组
     */
    addWords(words: string[]) {
        for (var word of words) {
            this.addWord(word);
        }
        return this;
    }

    /**
     * 删除关键字
     * @param words 关键字数组
     */
    removeWords(words: string[]) {
        for (var word of words) {
            this.removeWord(word);
        }
        return this;
    }

    /**
     * 添加关键字
     * @param word 关键字
     */
    addWord(word: string) {
        if (this.words[word]) {
            return this;
        }
        var tree_node: any = this.tree || {};
        for (var i = 0; i < word.length; i++) {
            var c = word[i];
            if (!tree_node[c]) {
                tree_node[c] = {
                    _$: 0,
                };
            }
            tree_node[c]._$ += 1;
            tree_node = tree_node[c];
        }
        tree_node.isEnd = true;
        this.words[word] = true;
        return this;
    }

    /**
     * 删除关键字
     * @param word 关键字数组
     */
    removeWord(word: string) {
        if (!this.words[word]) {
            return this;
        }
        delete this.words[word];
        var tree_node: any = this.tree || {};
        for (var i = 0; i < word.length; i++) {
            var c = word[i];
            if (!tree_node[c]) {
                break;
            }
            tree_node[c]._$ -= 1;
            if (tree_node[c]._$ == 0) {
                delete tree_node[c];
            }
            tree_node = tree_node[c];
        }
        return this;
    }

    private *_find(str) {
        var tree_node = this.tree;
        for (var i = 0; i < str.length; i++) {
            var skip = 0;
            var found_words = [];
            var found_str = "";
            for (var j = i; j < str.length; j++) {
                var char = str[j];
                var current_node = tree_node[char];
                if (!current_node) {
                    skip = j - i;
                    tree_node = this.tree;
                    break;
                }
                found_str = found_str + char;
                if (current_node.isEnd) {
                    found_words.unshift(found_str);
                    if (current_node._$ == 1) {
                        skip = j - i;
                        tree_node = this.tree;
                        yield found_str;
                    }
                }
                tree_node = current_node;
            }
            if (skip > 1) {
                i += skip - 1;
            }
        }
    }

    /**
     * 是否命中任何关键字,命中第一个时候会停止查找
     * @param str 要匹配的字符串
     */
    has(str) {
        var res = this._find(str);
        return !!res.next().value;
    }

    /**
     * 查询所有命中的关键字
     * @param str
     */
    findAll(str) {
        const keywords = [];
        const it = this._find(str);
        let result = it.next();
        while (!result.done) {
            keywords.push(result.value);
            result = it.next();
        }
        return keywords;
    }
}
