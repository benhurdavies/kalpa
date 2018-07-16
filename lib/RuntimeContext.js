import SysmbolTable from './SymbolTable';

class RuntimeContext {
  constructor() {
    this.table = new SysmbolTable();
  }
}

export default RuntimeContext;
