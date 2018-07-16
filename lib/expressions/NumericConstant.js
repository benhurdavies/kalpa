import Expression from './Expression';
import typeInfo from '../typeInfo';
import SymbolInfo from '../SymbolInfo';

class NumericConstant extends Expression {
  constructor(value) {
    super();
    this.info = new SymbolInfo(typeInfo.NUMERIC, null, value);
  }

  evaluate(runtimeContext) {
    return this.info;
  }

  typeCheck(compilationContext) {
    return this.info.type;
  }

  getType() {
    return this.info.type;
  }
}

export default NumericConstant;
