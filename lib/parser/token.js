import type from '../typeInfo';

const tokens = {
  ILLEGAL: -1,
  PLUS: 1,
  MUL: 2,
  DIV: 3,
  SUB: 4,
  O_PAREN: 5,
  C_PAREN: 6,
  NULL: 8,
  PRINT: 9,
  PRINT_LN: 10,
  UNQUOTED_STRING: 11,
  SEMI: 12,

  NUMBER: 13,
  VAR_STRING: 14,
  BOOL: 15,
  NUMERIC: 16,
  COMMENT: 17,
  BOOL_TRUE: 18,
  BOOL_FALSE: 19,
  STRING: 20,
  ASSIGN: 21
};

export default tokens;

export const tokenType = {
  [tokens.BOOL]: type.BOOL,
  [tokens.NUMERIC]: type.NUMERIC,
  [tokens.VAR_STRING]: type.STRING
};
