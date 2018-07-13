import RDParser from '../../lib/parser/RDParser';
import CompilationContext from '../../lib/CompilationContext';
import RuntimeContext from '../../lib/RuntimeContext';

const program = `numeric a; a=20+7; printLine "benhur age is "+a;`;

const parser = new RDParser(program);
const compileContext = new CompilationContext();
const runtimeContext = new RuntimeContext();
const statements = parser.parse(compileContext);

statements.forEach(statement => {
  statement.execute(runtimeContext);
});
