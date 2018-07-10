import Expression from './Expression';

class Constant extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }

  evaluate(context) {
    return this.value;
  }
}

export default Constant;
