    PUSH 1
start:
    DUP
    PUSH 10000
    GT
    BRT end
    DUP
    PR
    INC
    BR start
end:
    HALT
