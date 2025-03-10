class MaxHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return max;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] >= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
                largest = left;
            }
            if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
                largest = right;
            }
            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    peek() {
        return this.heap.length ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }
}
const hp = new MaxHeap();
hp.push(10);
hp.push(20)
hp.push(60);
hp.push(40);

while (hp.size()) {
    console.log(hp.pop());
}

module.exports.MaxHeap = MaxHeap;