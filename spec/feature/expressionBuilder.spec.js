import ExprBuilder from '../../lib/ExpressionBuilder';

describe('expression builder', () => {
  it('5 * 10', () => {
    const builder = new ExprBuilder('5 * 10');
    const expr = builder.getExpression();
    expect(expr.evaluate(null)).toEqual(50);
  });

  it('(5 + 10)*5*-6', () => {
    const builder = new ExprBuilder('(5 + 10)*5*-6');
    const expr = builder.getExpression();
    expect(expr.evaluate(null)).toEqual(-450);
  });

  it('((5 + 10)+5)*-6', () => {
    const builder = new ExprBuilder('((5 + 10)+5)*-6');
    const expr = builder.getExpression();
    expect(expr.evaluate(null)).toEqual(-120);
  });

  it('-12*(15/3)', () => {
    const builder = new ExprBuilder('-12*(15/3)');
    const expr = builder.getExpression();
    expect(expr.evaluate(null)).toEqual(-60);
  });
});
