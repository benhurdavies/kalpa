import RDParser from '../../lib/parser/RDParser';

describe('RdParse', () => {
  const consoleLog = console.log;

  beforeEach(function() {
    console.log = consoleLog;
  });
  afterEach(function() {
    console.log = consoleLog;
  });
  describe('statements', () => {
    it('print 2+6;', () => {
      let log = '';
      console.log = toPrint => {
        log += toPrint;
      };
      const parser = new RDParser('print 2+6;');
      const statments = parser.parse();
      statments.forEach(statement => {
        statement.execute(null);
      });
      expect(log).toEqual('8');
    });

    it('print 2+6; print (2*6);', () => {
      let log = '';
      console.log = toPrint => {
        log += toPrint;
      };
      const parser = new RDParser('printLine (2*6); print 2+6;');
      const statments = parser.parse();
      statments.forEach(statement => {
        statement.execute(null);
      });
      expect(log).toEqual('12\n8');
    });
  });
});
