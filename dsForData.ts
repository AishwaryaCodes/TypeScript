// Build a data structure that stores the data in a specific manner.

class dataSrtucture {
    private arr: number[] = []; // stores value

    private pos: Map<number, number> = new Map(); // val -> index of array

    insert(val: number): boolean {
        if(this.pos.has(val)) return false; // check if val exits 

        this.arr.push(val); // store to array

        this.pos.set(val, this.arr.length - 1); // store index  in map

        return true;
    }


    // no shifting, swap with last and remove 
    remove(val: number): boolean {
        if(!this.pos.has(val)) return false;

        const idx = this.pos.get(val)!; // get index

        const lastIdx = this.arr.length - 1; // get last value 
        const lastVal = this.arr[lastIdx];

        if(idx !== lastIdx) {
            this.arr[idx] = lastVal; // replace 
            this.pos.set(lastVal, idx); // update map
        }

        this.arr.pop(); // remove last
        this.pos.delete(val); // remove from map

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
        return this.arr.slice(); // return a copy
    }
}

const ds = new dataSrtucture();

ds.insert(10);
ds.insert(20);
ds.insert(30);

console.log(ds.toArray());

ds.remove(20);

console.log(ds.getRandom()); // returns 10 or 30)

console.log(ds.toArray());