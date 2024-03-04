    PUSH 0
inicio_bucle:
    DUP
    PUSH 15
    GTE
    BRT end
    DUP
    LOAD
    PUSH 2
primo_inicio:
    DUP2
    DUP
    MUL
    LT
    BRT primo_si
    DUP2
    MOD
    PUSH 0
    EQ
    BRT primo_no
    INC
    BR primo_inicio
primo_no:
    POP
    POP
    DUP
    PUSH 0
    STORE
    BR siguiente
primo_si:
    POP
    POP
    DUP
    PUSH 1
    STORE
siguiente:
    INC
    BR inicio_bucle
end:
    HALT