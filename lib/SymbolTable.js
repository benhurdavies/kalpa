import Variable from './expressions/Variable';

class SymbolTable {
  constructor() {
    this.table = {};
  }
  add(symbol) {
    this.table[symbol.name] = symbol;
  }

  get(name) {
    return this.table[name];
  }

  assign(variable, symbol) {
    const symbolName =
      variable instanceof String ? variable : variable.getName();
    this.table[symbolName] = symbol;
  }
}

export default SymbolTable;
