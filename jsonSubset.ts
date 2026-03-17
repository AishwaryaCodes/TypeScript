// Design an object representation for a subset of JSON containing only objects, arrays and strings.
// Examples from this JSON subset:
//  ex1 = {"a": "foo", "b": "bar"}
//  ex2 = {"b": ["foo", "bar"]}
//  ex3 = {"a": {"b": [{"c": "foo", "d": {}, "e": "bar", "f": {"g": "baz"}}]}}
//  4. {"a": [{"b": "foo"}, {"c": "bar"}, {"b": "baz"}]}
//  5. ["val1", "val2", {"a": "foo"}]

// Todo 
// 1. Validate JSON subset
// 2. Get value using path

type JValue = String | JObject | JArray;

type JObject = {[Key: string]: JValue};

type JArray = JValue[];


class JsonHelper {
    private data: JValue; 

    constructor(data: JValue) {
        this.data = data;
    }

    static isValid(value: unknown): value is JValue {

        if(typeof value === "string") return true;

        if(Array.isArray(value)) {
            return value.every(v => JsonHelper.isValid(v));
        }

        if(value !== null && typeof value === 'object') {
            for(const v of Object.values(value)) {
                if(!JsonHelper.isValid(v)) return false;
            }
            return true;
        }

        return false;
    }


    get(path: (string | number)[]): JValue | undefined {

        let curr: any = this.data;

        for(const step of path) {

            if(typeof step === "number") {
                if(!Array.isArray(curr)) return undefined;
                curr = curr[step];
            }

            else {
                if (curr === null || typeof curr !== "object" || Array.isArray(curr)) return undefined;

                curr = curr[step];
            }

            if(curr === undefined) return undefined;
            
        }

        return curr;
    
    }

}
 

const validData = {
  a: "hello",
  b: ["x", "y"],
};

console.log(JsonHelper.isValid(validData)); 
// true

const invalidData = {
  a: 123 // number not allowed
};

console.log(JsonHelper.isValid(invalidData));
// false


const data = {
  a: {
    b: [
      { c: "foo" }
    ]
  }
};

const helper = new JsonHelper(data);

console.log(helper.get(["a", "b", 0, "c"]));
// "foo"