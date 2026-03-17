// Batcher (time - or size-based flush) - collect many items and process them together instead of processing each one individually.

// Goal: Collect items for up to maxWait ms or until size maxSize, then flush them together.

// API: add(item) returns a promise that resolves when that item’s batch is flushed.

type Resolver<T> =(value: T) => void; 

class Batcher<T> {

    private buffer: T[] = []; // Colleting items 

    private resolver: Resolver<T[]>[] = []; // promises waiting

    private timer: NodeJS.Timeout | null = null; // flush timer

    private readonly maxWait: number;

    private readonly maxSize: number;

    private readonly flushHandler: (items: T[]) => Promise<any>; // function that process batch

    constructor ( // initializes 
        maxWait: number, // how long to wait
        maxSize: number, // max batch size
        flushHandler: (items: T[]) => Promise<any>
    ){
        this.maxWait = maxWait;
        this.maxSize = maxSize;
        this.flushHandler = flushHandler;
    }


    add(item: T): Promise<any> {
        return new Promise((resolve) => {
            this.buffer.push(item); // store item in buffer
            this.resolvers.push(resolve); // store promise resolver

            if(this.buffer.length >= this.maxSize) { // check batch size
                this.flush(); // flush immediately
            }

            else if(!this.timer) { // start timer 
                this.timer = setTimeout(() => this.flush(), this.maxWait);
            }
        });
    }


    private async flush() {
        if(!this.timer) {  // clear timer
            clearTimeout(this.timer);
            this.timer = null;
        }

        const items = this.buffer; //copy buffered item
        const resolves = this.resolvers;

        this.buffer = []; // reset
        this.resolvers = [];

        if(items.length === 0) return;

        try {
            const result = await this.flushHandler(items); // call handler

            resolves.forEach((r) => r(result)); // resolve promises
        }
        catch (err) {
            resolves.forEach((r) => r(Promise.reject(err)));
        } 
    }
}

const b = new Batcher();

