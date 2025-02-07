class Stack:
    def __init__(self) -> None:
        self.list = []
        self.size = 0
    def push(self, val) -> None:
        self.list.append(val)
        self.size += 1
    
    def peek(self):
        if self.size == 0:
            return None
        return self.list[-1]
    def pop(self):
        if self.size == 0:
            return None
        val = self.list[-1]
        del self.list[-1]
        self.size -= 1
        return val
    def isEmpty(self):
        return self.size == 0
    




