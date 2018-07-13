import BinaryPlus from '../expressions/BinaryPlus';
import BinaryMinus from '../expressions/BinaryMinus';
import MulExp from '../expressions/Mul';
import DivExp from '../expressions/Div';
import NumericConstant from '../expressions/NumericConstant';
import BooleanConstant from '../expressions/BooleanConstant';
import StringLiteral from '../expressions/StringLiteral';
import UnaryPlus from '../expressions/UnaryPlus';
import UnaryMinus from '../expressions/UnaryMinus';
import Variable from '../expressions/Variable';
import {
  Print as PrintStm,
  PrintLine as PrintLineStm
} from '../statements/Print';
import AssignmentStm from '../statements/Assignment';
import * as operator from '../operator';
import Lexer from './Lexer';
import tokens, { tokenType } from './token';
import symbolInfo from '../SymbolInfo';

class RDParser extends Lexer {
  constructor(str) {
    super(str);
  }

  callExpr() {
    this.getNext();
    return this.expr();
  }

  parse(compilationContext) {
    this.getNext();
    return this.statementList(compilationContext);
  }

  /* grammer
  <stmtlist> := { statement }+
  {statement} := <printstmt> | <printlinestmt>
  <printstmt> := print <expr >;
  <printlinestmt>:= printline <expr>;

  <vardeclstmt> := STRING <varname>; | NUMERIC <varname>; | BOOLEAN <varname>; 

  <Expr> ::= <Term> | Term { + | - } <Expr>
  <Term> ::= <Factor> | <Factor> {*|/} <Term>
  <Factor>::= <number> | ( <expr> ) | {+|-} <factor>
    <variable> | TRUE | FALSE
  */
  expr(compilationContext) {
    let retValue = this.term(compilationContext);
    while (
      this.currentToken === tokens.PLUS ||
      this.currentToken === tokens.SUB
    ) {
      const lastToken = this.currentToken;
      this.getNext();
      const exp1 = this.expr(compilationContext);
      retValue =
        lastToken === tokens.PLUS
          ? new BinaryPlus(retValue, exp1)
          : new BinaryMinus(retValue, exp1);
    }
    return retValue;
  }

  term(compilationContext) {
    let retValue = this.factor(compilationContext);
    while (
      this.currentToken === tokens.MUL ||
      this.currentToken === tokens.DIV
    ) {
      const lastToken = this.currentToken;
      this.getNext();
      const exp1 = this.term(compilationContext);
      retValue =
        lastToken === tokens.MUL
          ? new MulExp(retValue, exp1)
          : new DivExp(retValue, exp1);
    }
    return retValue;
  }

  factor(compilationContext) {
    let retValue = null;
    let lastToken = this.currentToken;
    if (this.currentToken === tokens.NUMERIC) {
      retValue = new NumericConstant(this.getNumber());
      this.getNext();
    } else if (this.currentToken === tokens.STRING) {
      retValue = new StringLiteral(this.getString());
      this.getNext();
    } else if (
      this.currentToken === tokens.BOOL_FALSE ||
      this.currentToken === tokens.BOOL_TRUE
    ) {
      retValue = new BooleanConstant(tokens.BOOL_FALSE ? false : true);
      this.getNext();
    } else if (this.currentToken === tokens.O_PAREN) {
      this.getNext();
      retValue = this.expr(compilationContext);
      if (this.currentToken !== tokens.C_PAREN) {
        throw Error('Missing Closing Parenthesis');
      }
      this.getNext();
    } else if (
      this.currentToken === tokens.PLUS ||
      this.currentToken === tokens.SUB
    ) {
      lastToken = this.currentToken;
      this.getNext();
      retValue = this.factor(compilationContext);
      retValue =
        lastToken === tokens.PLUS
          ? new UnaryPlus(retValue)
          : new UnaryMinus(retValue);
    } else if (this.currentToken === tokens.UNQUOTED_STRING) {
      const symbol = compilationContext.table.get(this.getString());
      if (!symbol) {
        throw Error('Undefined symbol');
      }
      this.getNext();
      retValue = new Variable(symbol);
    } else {
      throw Error('Illegal Token');
    }
    return retValue;
  }

  statementList(compilationContext) {
    let statements = [];
    while (this.currentToken != tokens.NULL) {
      const statement = this.statement(compilationContext);
      if (statement) {
        statements.push(statement);
      }
    }
    return statements;
  }

  statement(compilationContext) {
    let retval = null;
    switch (this.currentToken) {
      case tokens.NUMERIC:
      case tokens.BOOL:
      case tokens.VAR_STRING: {
        retval = this.parseVariableDeclStatement(compilationContext);
        this.getNext();
        break;
      }
      case tokens.PRINT:
        retval = this.parsePrintStatement(compilationContext);
        this.getNext();
        break;
      case tokens.PRINT_LN:
        retval = this.parsePrintLNStatement(compilationContext);
        this.getNext();
        break;
      case tokens.UNQUOTED_STRING:
        retval = this.parseAssignmentStatement(compilationContext);
        this.getNext();
        break;
      default:
        throw Error('Invalid statement');
    }
    return retval;
  }

  parsePrintStatement(compilationContext) {
    this.getNext();
    const expr = this.expr(compilationContext);
    if (this.currentToken !== tokens.SEMI) {
      throw Error('; is expected');
    }
    return new PrintStm(expr);
  }
  parsePrintLNStatement(compilationContext) {
    this.getNext();
    const expr = this.expr(compilationContext);
    if (this.currentToken !== tokens.SEMI) {
      throw Error('; is expected');
    }
    return new PrintLineStm(expr);
  }

  parseVariableDeclStatement(compilationContext) {
    const token = this.currentToken;
    this.getNext();
    if (this.currentToken === tokens.UNQUOTED_STRING) {
      const symbol = new symbolInfo(tokenType[token], this.getString());
      this.getNext();
      if (this.currentToken === tokens.SEMI) {
        compilationContext.table.add(symbol);
      } else {
        //  CSyntaxErrorLog.AddLine("; expected");
        //  CSyntaxErrorLog.AddLine(GetCurrentLine(SaveIndex()));
        //  throw new CParserException(-100, ", or ; expected", SaveIndex());
        throw Error(', or ; expected');
      }
    } else {
      // CSyntaxErrorLog.AddLine("invalid variable declaration");
      // CSyntaxErrorLog.AddLine(GetCurrentLine(SaveIndex()));
      // throw new CParserException(-100, ", or ; expected", SaveIndex());
      throw Error(', or ; expected');
    }
  }

  parseAssignmentStatement(compilationContext) {
    let symbol = compilationContext.table.get(this.getString());
    if (!symbol) {
      //  CSyntaxErrorLog.AddLine("Variable not found " + last_str);
      //  CSyntaxErrorLog.AddLine(GetCurrentLine(SaveIndex()));
      //  throw new CParserException(-100, "Variable not found", SaveIndex());
      throw Error('Variable not found');
    }
    this.getNext();
    if (this.currentToken !== tokens.ASSIGN) {
      // CSyntaxErrorLog.AddLine("= expected");
      // CSyntaxErrorLog.AddLine(GetCurrentLine(SaveIndex()));
      // throw new CParserException(-100, "= expected", SaveIndex());
      throw Error('= expected');
    }
    this.getNext();
    const expr = this.expr(compilationContext);
    if (expr.typeCheck(compilationContext) !== symbol.type) {
      throw Error('Type mismatch in assignment');
    }
    if (this.currentToken !== tokens.SEMI) {
      // CSyntaxErrorLog.AddLine("; expected");
      // CSyntaxErrorLog.AddLine(GetCurrentLine(SaveIndex()));
      // throw new CParserException(-100, " ; expected", -1);
      throw Error(' ; expected');
    }
    return new AssignmentStm(symbol, expr);
  }

  getNext() {
    this.currentToken = this.getToken();
  }
}

export default RDParser;
