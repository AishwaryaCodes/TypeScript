// Implement a function 'pathQuery()' that takes a JSON value and a path of
// property names and returns all the referenced objects, arrays or strings.
// Examples of path queries:
//  - {"a": "foo"} and ["a"] returns "foo"
//  - {"a": {"b": "foo"}} and ["a"] returns {"b": "foo"}
//  - {"a": {"b": [{"c": "foo", "d": {}, "e": "bar"}]}} and ["a", "b", "c"] returns "foo"
//  - {"a": {"b": [{"c": "foo", "d": {}, "e": "bar"},{"c": "baz"}]}} and ["a", "b", "c"] returns "foo" and "baz"


type Jval = string | JObj | JArr;

type JObj = {[key: string]: Jval};

type JArr = Jval[];


class JsonPathQuery {

    private data: Jval;

    constructor(data: Jval) {
        this.data = data;
    }

    private static isObject(x: unknown): x is JObj {
        return x !== null && typeof x === "object" && !Array.isArray(x);
    }

    private static isArray(x: unknown): x is JArr {
        return Array.isArray(x);
    }


    query(path: string[]): Jval[] {

        let frointer: Jval[] = [this.data];

        for(const key of path) {
            const next: Jval[] = [];

            for(const node of frointer) {
                if(JsonPathQuery.isObject(node)) {
                    if(Object.prototype.hasOwnProperty.call(node,key)) {
                        next.push(node[key]);
                    }
                }
                else if (JsonPathQuery.isArray(node)) {
                    for(const el of node) {
                        if (JsonPathQuery.isObject(el) && Object.prototype.hasOwnProperty.call(el, key)) {
                            next.push(el[key]);
                        }
                    }
                }
            }
            frointer = next;

            if(frointer.length === 0) break;
        }

        return frointer;
    }
}

const data  = {
  a: {
    b: "hello",
    c: "world"
  },
  b: {
    d: "aish"
  }
};


const helper1  = new JsonPathQuery(data);

console.log(helper1.query(["a"]));

console.log(helper1.query(["b"]));