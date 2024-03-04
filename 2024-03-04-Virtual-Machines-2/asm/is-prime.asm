    PUSH 85
    PUSH 2
start:
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
    BR start
primo_si:
    PUSH 1
    PR
    HALT
primo_no:
    PUSH 0
    PR
    HALT