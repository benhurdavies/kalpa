import Expression from './Expression';
import * as operator from '../operator';

class Binary extends Expression {
  constructor(exp1, exp2, operator) {
    super();
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.operator = operator;
  }

  evaluate(context) {
    switch (this.operator) {
      case operator.PLUS:
        return this.exp1.evaluate(context) + this.exp2.evaluate(context);
      case operator.MINUS:
        return this.exp1.evaluate(context) - this.exp2.evaluate(context);
      case operator.DIV:
        return this.exp1.evaluate(context) / this.exp2.evaluate(context);
      case operator.MUL:
        return this.exp1.evaluate(context) * this.exp2.evaluate(context);
      default:
        throw Error(`Not implemented operatoration type : ${this.operator}`);
    }
  }
}

export default Binary;
