// Implement a function 'pathQuery()' that takes a JSON value and a path of
// property names and returns all the referenced objects, arrays or strings.
// Examples of path queries:
//  - {"a": "foo"} and ["a"] returns "foo"
//  - {"a": {"b": "foo"}} and ["a"] returns {"b": "foo"}
//  - {"a": {"b": [{"c": "foo", "d": {}, "e": "bar"}]}} and ["a", "b", "c"] returns "foo"
//  - {"a": {"b": [{"c": "foo", "d": {}, "e": "bar"},{"c": "baz"}]}} and ["a", "b", "c"] returns "foo" and "baz"

type Jval = string | Jobj | Jarr;

type Jobj = {[k:string]: Jval};

type Jarr = Jval[];


const isObj = (x: unknown): x is Jobj => 
    x !== null && typeof x === "object" && !Array.isArray(x);
const isArr = Array.isArray;


export function pathQuery(root: Jval, path: string[]): Jval[] {
    let frontier: Jval[] = [root];

    for(const key of path) {
        const next: Jval[] = [];

        for(const node of frontier) {
            if (isObj(node)) {
                if (Object.prototype.hasOwnProperty.call(node, key)) {
                    next.push(node[key]);
                }
            }
            else if(isArr(node)) {
                    for(const el of node) {
                        if(isObj(el) && Object.prototype.hasOwnProperty.call(el, key)){
                            next.push(el[key]);
                        }
                    }
                }

            }
            frontier = next;

            if(frontier.length === 0) break;
        }

        return frontier;
    }


const data1 = {a: "foo"};

console.log(pathQuery(data1, ["a"]));

