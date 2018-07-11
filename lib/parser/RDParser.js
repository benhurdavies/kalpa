import BinaryExp from '../expressions/Binary';
import ConstantExp from '../expressions/Constant';
import UnaryExp from '../expressions/Unary';
import {
  Print as PrintStm,
  PrintLine as PrintLineStm
} from '../statements/Print';
import * as operator from '../operator';
import Lexer from './Lexer';
import tokens from './token';

class RDParser extends Lexer {
  constructor(str) {
    super(str);
    this.currentToken = null;
  }

  callExpr() {
    this.getNext()
    return this.expr();
  }

  parse() {
    this.getNext()
    return this.statementList();
  }

  /* grammer
  <stmtlist> := { statement }+
  {statement} := <printstmt> | <printlinestmt>
  <printstmt> := print <expr >;
  <printlinestmt>:= printline <expr>;

  <Expr> ::= <Term> | Term { + | - } <Expr>
  <Term> ::= <Factor> | <Factor> {*|/} <Term>
  <Factor>::= <number> | ( <expr> ) | {+|-} <factor>
  */
  expr() {
    let retValue = this.term();
    while (
      this.currentToken === tokens.PLUS ||
      this.currentToken === tokens.SUB
    ) {
      const lastToken = this.currentToken;
      this.getNext()
      const exp1 = this.expr();
      retValue = new BinaryExp(
        retValue,
        exp1,
        lastToken === tokens.PLUS ? operator.PLUS : operator.MINUS
      );
    }
    return retValue;
  }

  term() {
    let retValue = this.factor();
    while (
      this.currentToken === tokens.MUL ||
      this.currentToken === tokens.DIV
    ) {
      const lastToken = this.currentToken;
      this.getNext()
      const exp1 = this.term();
      retValue = new BinaryExp(
        retValue,
        exp1,
        lastToken === tokens.MUL ? operator.MUL : operator.DIV
      );
    }
    return retValue;
  }

  factor() {
    let retValue = null;
    let lastToken = this.currentToken;
    if (this.currentToken === tokens.DOUBLE) {
      retValue = new ConstantExp(this.getNumber());
      this.getNext()
    } else if (this.currentToken === tokens.O_PAREN) {
      this.getNext()
      retValue = this.expr(); // Recurse
      if (this.currentToken !== tokens.C_PAREN) {
        throw Error('Missing Closing Parenthesis');
      }
      this.getNext()
    } else if (
      this.currentToken === tokens.PLUS ||
      this.currentToken === tokens.SUB
    ) {
      lastToken = this.currentToken;
      this.getNext()
      retValue = this.factor();
      retValue = new UnaryExp(
        retValue,
        lastToken === tokens.PLUS ? operator.PLUS : operator.MINUS
      );
    } else {
      throw Error('Illegal Token');
    }
    return retValue;
  }

  statementList() {
    let statements = [];
    while (this.currentToken != tokens.NULL) {
      const statement = this.statement();
      if (statement !== null) {
        statements.push(statement);
      }
    }
    return statements;
  }

  statement() {
    let retval = null;
    switch (this.currentToken) {
      case tokens.PRINT:
        retval = this.parsePrintStatement();
        this.getNext()
        break;
      case tokens.PRINT_LN:
        retval = this.parsePrintLNStatement();
        this.getNext()
        break;
      default:
        throw Error('Invalid statement');
    }
    return retval;
  }

  parsePrintStatement() {
    this.getNext()
    const expr = this.expr();
    if (this.currentToken !== tokens.SEMI) {
      throw Error('; is expected');
    }
    return new PrintStm(expr);
  }
  parsePrintLNStatement(){
    this.getNext()
    const expr = this.expr();
    if (this.currentToken !== tokens.SEMI) {
      throw Error('; is expected');
    }
    return new PrintLineStm(expr);
  }

  getNext(){
    this.currentToken=this.getToken();
  }
}

export default RDParser;
