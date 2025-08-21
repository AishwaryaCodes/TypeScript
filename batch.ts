// Batcher (time - or size-based flush)

// Goal: Collect items for up to maxWait ms or until size maxSize, then flush them together.

// API: add(item) returns a promise that resolves when that item’s batch is flushed.

type Resolver<T> =(value: T) => void; 

class Batcher<T> {

    private buffer: T[] = [];

    private resolver: Resolver<T[]>[] = [];

    private timer: NodeJS.Timeout | null = null;

    private readonly maxWait: number;
    private readonly maxSize: number;
    private readonly flushHandler: (items: T[]) => Promise<any>;

    constructor (
        maxWait: number,
        maxSize: number,
        flushHandler: (items: T[]) => Promise<any>
    ){
        this.maxWait = maxWait;
        this.maxSize = maxSize;
        this.flushHandler = flushHandler;
    }


    add(item: T): Promise<any> {
        return new Promise((resolve) => {
            this.buffer.push(item);
            this.resolvers.push(resolve);

            if(this.buffer.length >= this.maxSize) {
                this.flush();
            }

            else if(!this.timer) {
                this.timer = setTimeout(() => this.flush(), this.maxWait);
            }
        });
    }


    private async flush() {
        if(!this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        const items = this.buffer;
        const resolves = this.resolvers;

        this.buffer = [];
        this.resolvers = [];

        if(items.length === 0) return;

        try {
            const result = await this.flushHandler(items);

            resolves.forEach((r) => r(result));
        }
        catch (err) {
            resolves.forEach((r) => r(Promise.reject(err)));
        } 
    }
}

const b = new Batcher();

