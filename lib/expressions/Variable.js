import Expression from './Expression';
import typeInfo from '../typeInfo';
import SymbolInfo from '../SymbolInfo';

class Variable extends Expression {
  constructor(info) {
    super();
    this.name = info.name;
    this.type = null;
  }
  getName() {
    return this.name;
  }

  evaluate(runtimeContext) {
    if (runtimeContext.table) {
      return runtimeContext.table.get(this.name);
    } else {
      return null;
    }
  }

  typeCheck(compilationContext) {
    if (compilationContext.table) {
      const symbol = compilationContext.table.get(this.name);
      if (symbol) {
        this.type = symbol.type;
        return this.type;
      }
    }
    return typeInfo.ILLEGAL;
  }

  getType() {
    return this.type;
  }
}

export default Variable;
