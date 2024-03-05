
const sumasimple = `
  push 1
  push 2
  add
  pr
  halt
`;

const ceroadiez = `
  push 0
begin:
  dup
  pr
  dup
  push 10
  ge
  brt end
  inc
  br begin
end:
  halt
`;

const es_primo = `
  push 2
inicio:
  dup2
  dup
  mul
  lt
  brt primo
  dup2
  mod
  push 0
  eq
  brt noprimo
  inc
  br inicio
noprimo:
  push 0
  pr
  halt
primo:
  push 1
  pr
  halt
`;

export default {
  sumasimple,
  ceroadiez,
  es_primo
}