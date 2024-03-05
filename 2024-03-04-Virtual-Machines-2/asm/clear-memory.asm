    PUSH 0
start:
    DUP
    PUSH 10
    GTE
    BRT end
    DUP
    PUSH 0
    STORE
    INC
    BR start
end:
    HALT