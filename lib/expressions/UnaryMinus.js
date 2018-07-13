import Expression from './Expression';
import typeInfo from '../typeInfo';
import SymbolInfo from '../SymbolInfo';

class UnaryMinus extends Expression {
  constructor(exp1) {
    super();
    this.exp1 = exp1;
    this.type = null;
  }

  evaluate(runtimeContext) {
    const leftSymbol = this.exp1.evaluate(runtimeContext);
    if (leftSymbol.type === typeInfo.NUMERIC) {
      return new SymbolInfo(typeInfo.NUMERIC, null, -leftSymbol.value);
    } else throw Error('Type mismatch');
  }

  typeCheck(compilationContext) {
    const leftType = this.exp1.typeCheck(compilationContext);
    if (leftType === typeInfo.NUMERIC) {
      this.type = leftType;
      return this.type;
    } else {
      throw Error('Type mismatch failure');
    }
  }

  getType() {
    return this.type;
  }
}
export default UnaryMinus;
