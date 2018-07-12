import Statement from './Statement';
import Variable from '../expressions/Variable';

class VariableDeclaration extends Statement {
  constructor(info) {
    this.info = info;
    this.variable = null;
  }

  execute(runtimeContext) {
    runtimeContext.table.add(this.info);
    this.variable = new Variable(this.info);
    return null;
  }
}

export default VariableDeclaration;
