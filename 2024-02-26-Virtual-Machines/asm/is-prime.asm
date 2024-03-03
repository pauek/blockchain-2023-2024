  // asumimos que en la pila hay el número de entrada (n)
  PUSH 2
inicio:
  // mirar si el divisor es menor que n
  DUP2
  DUP
  MUL
  LT
  BRT primo
  DUP2
  MOD
  PUSH 0
  EQ
  BRT noprimo
  INC
  BR inicio
noprimo:
  PUSH 0
  PR 
  HALT
primo:
  PUSH 1
  PR
  HALT