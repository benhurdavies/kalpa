import SysmbolTable from './SymbolTable';

class CompilationContext {
  constructor() {
    this.table = new SysmbolTable();
  }
}

export default CompilationContext;
