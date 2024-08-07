export class InternalEncrypt {
  constructor(private xor = 89, private hex = 110) {}
  /**
   * encrypto 加密程序
   * @param {Strng} str 待加密字符串
   * @param {Number} xor 异或值
   * @param {Number} hex 加密后的进制数
   * @return {Strng} 加密后的字符串
   */
  private encrypto(str, xor, hex) {
    if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
      return;
    }

    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;

    for (let i = 0; i < str.length; i++) {
      // 提取字符串每个字符的ascll码
      let charCode: any = str.charCodeAt(i);
      // 进行异或加密
      charCode = (charCode * 1) ^ xor;
      // 异或加密后的字符转成 hex 位数的字符串
      charCode = charCode.toString(hex);
      resultList.push(charCode);
    }

    let splitStr = String.fromCharCode(hex + 97);
    let resultStr = resultList.join(splitStr);
    return resultStr;
  }
  /**
   * decrypto 解密程序
   * @param {Strng} str 待加密字符串
   * @param {Number} xor 异或值
   * @param {Number} hex 加密后的进制数
   * @return {Strng} 加密后的字符串
   */
  private decrypto(str, xor, hex) {
    if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
      return;
    }
    let strCharList = [];
    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;
    // 解析出分割字符
    let splitStr = String.fromCharCode(hex + 97);
    // 分割出加密字符串的加密后的每个字符
    strCharList = str.split(splitStr);

    for (let i = 0; i < strCharList.length; i++) {
      // 将加密后的每个字符转成加密后的ascll码
      let charCode = parseInt(strCharList[i], hex);
      // 异或解密出原字符的ascll码
      charCode = (charCode * 1) ^ xor;
      let strChar = String.fromCharCode(charCode);
      resultList.push(strChar);
    }
    let resultStr = resultList.join('');
    return resultStr;
  }

  decode(str) {
    return JSON.parse(this.decrypto(str, this.xor, this.hex));
  }
  encode(obj) {
    return this.encrypto(JSON.stringify(obj), this.xor, this.hex);
  }
}
