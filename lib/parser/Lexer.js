import tokens from './token';

class Lexer {
  constructor(exprString) {
    this.exprString = exprString;
    this.length = exprString.length;
    this.index = 0;
    this.number = null;
    this.lastStringValue = null;
    this.valueToken = {
      print: tokens.PRINT,
      printLine: tokens.PRINT_LN
    };
  }

  getToken() {
    let token = tokens.ILLEGAL;
    let { length, exprString } = this;
    while (
      this.index < length &&
      (exprString[this.index] === ' ' || exprString[this.index] === '\t')
    )
      this.index++;

    if (this.index === length) return tokens.NULL;
    const curChar = exprString[this.index];
    if (curChar === '+') {
      token = tokens.PLUS;
      this.index++;
    } else if (curChar === '-') {
      token = tokens.SUB;
      this.index++;
    } else if (curChar === '/') {
      token = tokens.DIV;
      this.index++;
    } else if (curChar === '*') {
      token = tokens.MUL;
      this.index++;
    } else if (curChar === '(') {
      token = tokens.O_PAREN;
      this.index++;
    } else if (curChar === ')') {
      token = tokens.C_PAREN;
      this.index++;
    } else if(curChar===';'){
      token = tokens.SEMI;
      this.index++;
    } else if ('0123456789'.indexOf(curChar) !== -1) {
      let str = '';
      while (
        this.index < length &&
        '0123456789'.indexOf(exprString[this.index]) >= 0
      ) {
        str += exprString[this.index];
        this.index++;
      }
      this.number = parseFloat(str);
      token = tokens.DOUBLE;
    } else if (/[a-zA-Z]/.test(curChar)) {
      let str = '';
      while (this.index < length && /[a-zA-Z]/.test(exprString[this.index])) {
        str += exprString[this.index];
        this.index++;
      }
      if (this.valueToken[str]) return this.valueToken[str];
      else throw Error('unidentified token');
    } else if (`"'`.indexOf(curChar) !== -1) {
      let str = '';
      this.index++;
      const startQuote = curChar;
      while (this.index < length && startQuote !== exprString[this.index]) {
        str += exprString[this.index];
        this.index++;
      }
      this.lastStringValue = str;
      token = tokens.UNQUOTED_STRING;
    } else {
      throw Error('Error While Analyzing Tokens');
    }

    return token;
  }

  getNumber() {
    return this.number;
  }
  getString() {
    return this.lastStringValue;
  }
}

export default Lexer;
