import Expression from './Expression';
import { PLUS, MINUS } from '../operator';

class Unary extends Expression {
  constructor(exp, operator) {
    super();
    this.exp = exp;
    this.operator = operator;
  }

  evaluate(context) {
    switch (this.operator) {
      case PLUS:
        return this.exp.evaluate(context);
      case MINUS:
        return -this.exp.evaluate(context);
      default:
        throw Error(`Not implemented operatoration type : ${this.operator}`);
    }
  }
}

export default Unary;
