//Implement a function that receives two integer vectors and returns their intersection. 

export function intersection(n1: number[], n2: number[]): number[] {

    if(n1.length > n2.length)
     [n1, n2] = [n2, n1];

    // build set for smaller array
    const seen = new Set(n1); // store elements of 1 array 

    const res: number[] = [];


    for(const x of n2) {
        if(seen.delete(x)) { // delete instead of has 
            res.push(x);   // delete - return true if element exists and remove it
        }
    }

    return res;

}

console.log(intersection([1, 2, 2, 1], [2, 2]));  

// each element should appear only once in result

// TC O(n + m)  - size of 1st and 2nd array
// SC O(min(n, m)) - store smaller array in set