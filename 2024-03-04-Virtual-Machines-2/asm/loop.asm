    PUSH 0
start:
    DUP
    PUSH 100
    LT
    BRF end
    DUP
    PR
    INC
    BR start
end:
    HALT