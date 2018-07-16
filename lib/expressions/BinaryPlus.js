import Expression from './Expression';
import typeInfo from '../typeInfo';
import SymbolInfo from '../SymbolInfo';

class BinaryPlus extends Expression {
  constructor(exp1, exp2) {
    super();
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.type = null;
  }

  evaluate(runtimeContext) {
    const leftSymbol = this.exp1.evaluate(runtimeContext);
    const rightSymbol = this.exp2.evaluate(runtimeContext);
    if (
      leftSymbol.type === typeInfo.STRING ||
      rightSymbol.type === typeInfo.STRING
    ) {
      return new SymbolInfo(
        typeInfo.STRING,
        null,
        leftSymbol.value.toString() + rightSymbol.value.toString()
      );
    } else if (
      leftSymbol.type === typeInfo.NUMERIC &&
      rightSymbol.type === typeInfo.NUMERIC
    ) {
      return new SymbolInfo(
        typeInfo.NUMERIC,
        null,
        leftSymbol.value + rightSymbol.value
      );
    } else throw Error('Type mismatch');
  }

  typeCheck(compilationContext) {
    const leftType = this.exp1.typeCheck(compilationContext);
    const rightType = this.exp2.typeCheck(compilationContext);
    if (leftType === rightType && leftType !== typeInfo.BOOL) {
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
export default BinaryPlus;
