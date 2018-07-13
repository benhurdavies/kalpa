import Statement from './Statement';

export class Print extends Statement {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  execute(runtimeContext) {
    const symbol = this.expr.evaluate(runtimeContext);
    console.log(symbol.value.toString());
    return true;
  }
}

export class PrintLine extends Statement {
  constructor(expr) {
    super();
    this.expr = expr;
  }

  execute(runtimeContext) {
    const symbol = this.expr.evaluate(runtimeContext);
    console.log(`${symbol.value}\n`);
    return true;
  }
}
