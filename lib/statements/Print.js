import Statement from './Statement';

export class Print extends Statement {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  execute(runtimeContext) {
    const value = this.expr.evaluate(runtimeContext);
    console.log(value.toString());
    return true;
  }
}

export class PrintLine extends Statement {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  execute(runtimeContext) {
    const value = this.expr.evaluate(runtimeContext);
    console.log(`${value}\n`);
    return true;
  }
}
