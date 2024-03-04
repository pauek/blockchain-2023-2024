    PUSH 0
start:
    DUP
    PUSH 0
    STORE
    INC
    DUP
    PUSH 10
    LT
    BRT start
    HALT
