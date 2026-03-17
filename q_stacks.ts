// Implement a queue with 2 stacks.

export class Queue<T> {

    private inStack: T[] = []; // enqueue

    private outStack: T[] = []; // dequeue


    enqueue(item: T): void {
        this.inStack.push(item); // just put in stack
    }

    dequeue(): T | undefined {
        if(this.outStack.length === 0) { // if outstack is empty 
            while(this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop()!); // move everything from inStack ->>> outStack
            } // this reverses order - to maintain FIFO ORDER
            // and then pop 
        }

        return this.outStack.pop(); // Correct FIFO ORDER
    }

     
    peek(): T | undefined {
        if(this.outStack.length === 0) {
            while(this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop()!); // just return , dont remove
            }
        }

        return this.outStack[this.outStack.length - 1];
    }


    size(): number {
        return this.inStack.length + this.outStack.length; // total elemnts 
    }


    isEmpty(): boolean {
        return this.size() === 0; 
    }

}


const q = new Queue<number>();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(q.dequeue()); // 1

console.log(q.peek());  // 2

console.log(q.dequeue()); // 2
console.log(q.dequeue()); // 3
console.log(q.isEmpty()); // true