import tokens from './token';

class Lexer {
  constructor(exprString) {
    this.exprString = exprString;
    this.length = exprString.length;
    this.index = 0;
    this.number = null;
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

    switch (exprString[this.index]) {
      case '+':
        token = tokens.PLUS;
        this.index++;
        break;
      case '-':
        token = tokens.SUB;
        this.index++;
        break;
      case '/':
        token = tokens.DIV;
        this.index++;
        break;
      case '*':
        token = tokens.MUL;
        this.index++;
        break;
      case '(':
        token = tokens.O_PAREN;
        this.index++;
        break;
      case ')':
        token = tokens.C_PAREN;
        this.index++;
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        {
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
        }
        break;
      default:
        throw Error('Error While Analyzing Tokens');
    }
    return token;
  }

  getNumber() {
    return this.number;
  }
}

export default Lexer;
