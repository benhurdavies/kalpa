import Binary from '../../lib/expressions/Binary';
import Constant from '../../lib/expressions/Constant';
import Unary from '../../lib/expressions/Unary';
import * as operator from '../../lib/operator';

describe('expression', () => {
  it('5 * 10', () => {
    const exp = new Binary(new Constant(5), new Constant(10), operator.MUL);
    expect(exp.evaluate(null)).toEqual(50);
  });

  it('5 * -10', () => {
    const exp = new Binary(
      new Constant(5),
      new Unary(new Constant(10), operator.MINUS),
      operator.MUL
    );
    expect(exp.evaluate(null)).toEqual(-50);
  });

  it('(5+6)*9', () => {
    const exp = new Binary(
      new Binary(new Constant(5), new Constant(6), operator.PLUS),
      new Constant(9),
      operator.MUL
    );
    expect(exp.evaluate(null)).toEqual(99);
  });
});
