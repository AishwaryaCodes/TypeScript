//Implement a function that receives two integer vectors and returns their intersection. 

export function intersection(n1: number[], n2: number[]): number[] {

    if(n1.length > n2.length)
     [n1, n2] = [n2, n1];


    const seen = new Set(n1);

    const res: number[] = [];


    for(const x of n2) {
        if(seen.delete(x)) {
            res.push(x);
        }
    }

    return res;

}

console.log(intersection([1, 2, 2, 1], [2, 2]));  