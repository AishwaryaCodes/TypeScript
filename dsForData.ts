// Build a data structure that stores the data in a specific manner.

class dataSrtucture {
    private arr: number[] = [];

    private pos: Map<number, number> = new Map();

    insert(val: number): boolean {
        if(this.pos.has(val)) return false;

        this.arr.push(val);

        this.pos.set(val, this.arr.length - 1);

        return true;
    }


    remove(val: number): boolean {
        if(!this.pos.has(val)) return false;

        const idx = this.pos.get(val)!;

        const lastIdx = this.arr.length - 1;
        const lastVal = this.arr[lastIdx];

        if(idx !== lastIdx) {
            this.arr[idx] = lastVal;
            this.pos.set(lastVal, idx);
        }

        this.arr.pop();
        this.pos.delete(val);

        return true;
    }


    getRandom(): number {
        if(this.arr.length === 0) {
            throw new Error("Randomized is Empty");
        }

        const i = Math.floor(Math.random() * this.arr.length);

        return this.arr[i];
    }


    toArray(): number[] {
        return this.arr.slice();
    }
}