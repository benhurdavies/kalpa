import RDParser from '../../lib/parser/RDParser';
import CompilationContext from '../../lib/CompilationContext';
import RuntimeContext from '../../lib/RuntimeContext';

const program = `numeric x;numeric a; x=5*6; a=x; print 'my age is : '+x;`;

const parser = new RDParser(program);
const compileContext = new CompilationContext();
const runtimeContext = new RuntimeContext();
const statements = parser.parse(compileContext);

statements.forEach(statement => {
  statement.execute(runtimeContext);
});
