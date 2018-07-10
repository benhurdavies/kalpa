import RDParser from './parser/RDParser';

class ExpressionBuilder {
  constructor(exprString) {
    this.exprString = exprString;
  }

  getExpression() {
    const parser = new RDParser(this.exprString);
    return parser.callExpr();
  }
}

export default ExpressionBuilder;
