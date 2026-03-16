//  Time Based Key-Value Store

class TimeMap {

    private map: Map<string, [number, string][]>;

    constructor() {
        this.map = new Map();
    }


    set(key: string, value: string, timestamp: number): void {

        if(!this.map.has(key)) this.map.set(key, []);

        this.map.get(key)!.push([timestamp, value]);
    }


    get(key: string, timestamp: number): string {

         if(!this.map.has(key)) return "";

         const arr = this.map.get(key)!;

         let left = 0; 
         let right = arr.length - 1;

         let result = "";

         while(left <= right) {

            const mid  = Math.floor((left + right) / 2);
                
            if(arr[mid][0] <= timestamp) {
                result = arr[mid][1];
                left = mid + 1;
                }

            else right = mid - 1;

         }

         return result;

    } 
}

const timeMap = new TimeMap();

timeMap.set("animal", "Dog", 1);

timeMap.set("animal", "Cat", 2);

timeMap.set("animal", "Horse", 5);

console.log(timeMap.get("animal", 4)); // cat 

console.log(timeMap.get("animal", 2)); // Cat

console.log(timeMap.get("animal", 7)); // Horse