// Design an object representation for a subset of JSON containing only objects, arrays and strings.
// Examples from this JSON subset:
//  ex1 = {"a": "foo", "b": "bar"}
//  ex2 = {"b": ["foo", "bar"]}
//  ex3 = {"a": {"b": [{"c": "foo", "d": {}, "e": "bar", "f": {"g": "baz"}}]}}
//  4. {"a": [{"b": "foo"}, {"c": "bar"}, {"b": "baz"}]}
//  5. ["val1", "val2", {"a": "foo"}]


console.log("JSON Subset");

export type Jvalue = string | JObject | JArray;


export type JObject = { [key: string] : Jvalue }


export type JArray = Jvalue[];



export const isJvalue = (x: unknown): x is Jvalue => 
     typeof x === "string" || isJObject(x) || isJArray(x);



export function isJObject(x: unknown): x is JObject {
    if (x === null || typeof x !== "object" || Array.isArray(x)) return false;

    for(const v of Object.values(x as Record<string, unknown>)) {
        if(!isJvalue(v)) return false;
    }
    return true;
}
 


export function isJArray(x: unknown): x is JArray {
    return  Array.isArray(x) && (x as unknown[]).every(isJvalue);
 }



export function jget(root: Jvalue, path: Array<string | number>): Jvalue | undefined {
    let curr: Jvalue | undefined = root;

    for(const step of path) {
        if(typeof step === "number") {
            if(Array.isArray(curr)) curr = curr[step]; 
            else return undefined;
        }
        else {
            if(curr && typeof curr === "object" && !Array.isArray(curr)) 
                curr = curr[step];
            else return undefined;
        }

        if(curr === undefined) return undefined;
    }
    return curr;
}



const ex1 = {"a": "foo", "b": "bar"};
const ex2 = {"b": ["foo", "bar"]};
const ex3 = {"a": {"b": [{"c": "foo", "d": {}, "e": "bar", "f": {"g": "baz"}}]}};
const ex4 = {"a": [{"b": "foo"}, {"c": "bar"}, {"b": "baz"}]};
const ex5 = ["val1", "val2", {"a": "foo"}];


// Validate each example
for (const [i, ex] of [ex1, ex2, ex3, ex4, ex5].entries()) {
  console.log(`ex${i + 1} valid?`, isJvalue(ex)); // should all log true
}


// Test the path getter
console.log('ex3["a"]["b"][0]["c"] =>', jget(ex3, ["a", "b", 0, "c"])); // "foo"
console.log('ex3["a"]["b"][0]["x"] =>', jget(ex3, ["a", "b", 0, "x"])); // undefined
