import Statement from './Statement';
import Variable from '../expressions/Variable';
import SymbolInfo from '../SymbolInfo';

class Assignment extends Statement {
  constructor(variable, expression) {
    super();
    this.variable =
      variable instanceof SymbolInfo ? new Variable(variable) : variable;
    this.exp1 = expression;
  }

  execute(runtimeContext) {
    const symbol = this.exp1.evaluate(runtimeContext);
    runtimeContext.table.assign(this.variable, symbol);
    return null;
  }
}

export default Assignment;
