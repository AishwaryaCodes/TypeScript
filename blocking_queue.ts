//Implement a concurrent blocking queue

export class BlockingQueue<T> {

    private buf: T[] = [];

    private takers: Array<(v: T) => void> = []; //waiting consumer

    private putter: Array<{value: T; resolve: () => void}> = []; // waiting producer

    private readonly cap: number;


    constructor(capacity: number = Infinity) {
        if(capacity <= 0 && capacity !== Infinity) {
            throw new Error("Capacity must be > 0 or Infinity");
        }
        this.cap = capacity;
    }


    get size(): number {return this.buf.length;}

    enqueue(value: T): Promise<void> {
        const taker = this.takers.shift();
        if(taker) {
            taker(value);
            return Promise.resolve();
        }

        if(this.buf.length < this.cap) {
            this.buf.push(value);
            return Promise.resolve();
        }

        return new Promise<void> (resolve => {
            this.putter.push({value, resolve});
        });
    }

    
    dequeue(): Promise<T> {
            if(this.buf.length > 0) {
                const v = this.buf.shift() as T;

                const p = this.putter.shift();
                if(p) {
                    this.buf.push(p.value); 
                    p.resolve(); 
                }

                return Promise.resolve(v);
            } 

            const p = this.putter.shift();
            if(p) {
                p.resolve();
                return Promise.resolve(p.value);
            }

            return new Promise<T> (resolve => {
                this.takers.push(resolve);
            });

     }

}



const q = new BlockingQueue<number>(2);

//consumer
(async () => {
    for(let i = 0; i < 5; i++) {
        const v = await q.dequeue();
        console.log("Took", v)
    }
})();



//producer
(async () => {
    for(let i = 0; i < 5; i++) {
        await q.enqueue(i);
        console.log("Put", i);
    }
})();



// “I built a FIFO BlockingQueue with a fixed capacity. Calls to enqueue or dequeue return Promises: 
// if the queue can’t serve the request immediately, the Promise waits and resolves later. 
// I keep three things: a buffer of items, a queue of waiting takers (consumers), and a queue of waiting putters (producers). 
// This gives me backpressure without blocking the JS thread.”


// Data structures
// buf: T[] → actual FIFO buffer.
// takers: Array<(v:T)=>void> → waiting consumers; each is a resolver we call with a value.
// putter: Array<{value:T; resolve:()=>void}> → waiting producers when the queue is full.
// cap → max items allowed (Infinity by default).


// Constructor / size
// Validate capacity (> 0 or Infinity), store it.
// size just returns buf.length.



// enqueue(value: T): Promise<void>
// Serve waiting consumer first (direct handoff):
// If takers has someone, shift() and call their resolver with value; return resolved Promise.

// Else buffer if space:
// If buf.length < cap, push(value) and return resolved Promise.

// Else wait (queue the producer):
// Return a Promise and stash {value, resolve} in putter. It resolves later when space frees.



// dequeue(): Promise<T>
// If buffer has data:
// shift() a value v. If a producer was waiting (queue was full earlier), admit exactly one: putter.shift(), push its value into buf, and p.resolve(). Return v.
// If buffer empty but a producer is waiting (zero-buffer handoff):
// putter.shift(), p.resolve(), return p.value.

// Else wait (queue the consumer):
// Return a Promise and push its resolver into takers. We’ll resolve it on a future enqueue.



// Why this works
// Backpressure: producers wait when full; consumers wait when empty.
// Fairness: we use FIFO (shift/push) for both waiting producers and consumers.
// Direct handoff reduces latency when the counterpart is already waiting.
// No thread blocking: waiting is Promise-based; event loop stays free.



// Complexity
// Each op is amortized O(1) (array push/shift).
// Space is O(cap + #waitingProducers + #waitingConsumers).