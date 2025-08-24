// Given a string str, return parsed JSON parsedStr. You may assume the str is a valid JSON string hence it only includes strings, numbers, arrays, objects, booleans, and null. str will not include invisible characters and escape characters. 
// Please solve it without using the built-in JSON.parse method.

// Example 1:
// Input: str = '{"a":2,"b":[1,2,3]}'  //B-F aval(str) = {"a":2,"b":[1,2,3]}
// Output: {"a":2,"b":[1,2,3]}
// Explanation: Returns the object represented by the JSON string.

// Example 2:
// Input: str = 'true' // true
// Output: true
// Explanation: Primitive types are valid JSON.


// no  - functions, undefined
// no - a\n , \
// no - whitespce
// no - 12.5 , 1e5 - Decimal/ Exponents 
// yes - "true" = true , "null" = null 
// nesting - no deep 
// TC  - o(n)
// SC - o(n)

// Optimal - Recurcive desent parser
// "{"":2,"b":[1,2,3]}"  
// { "a":2, "b" : [ 1,2,3 ] }

// i = 0 str[i] = { k = string - parseString "a" :  parseNumber 2 

function parseJson(str: string): any {

  let i = 0;
  const peek = () => str[i];
  const next = () => str[i++];

  function skipSpace(): void {
    while(i < str.length && /\s/.test(peek())) next();
  }


  function parseValue(): any {
    skipSpace();
    const ch = peek();

    if(ch === "{") return parseOject();
    if(ch === "[") return parseArray();
    if(ch === '"') return parseString();
    if(ch === "t" || ch === "f") return parseBoolean();
    if(ch === "n") return parseNull();
    return parseNumber();
  }


 function parseOject(): Record<string, any> {
  const obj: Record<string, any> = {};
  next();
  skipSpace();

  if(peek() === '}') {
    next();
    return obj;
  }

  while(true) {
     skipSpace();
     const key = parseString();
     skipSpace();
     next();

     const value = parseValue();
     obj[key] = value;

     skipSpace();

     if(peek() === '}') {next();break; } 
     next();
  }

  return obj;
}


function parseArray(): any[] {
  const arr: any[] = [];
  next();
  skipSpace();

  if(peek() === "]") {next(); return arr}

  while(true) {
    const value = parseValue();

    arr.push(value);

    skipSpace();

    if(peek() === "]") {next(); break;}

    next();
  }

  return arr;
}


function parseString(): string {
  let out = "";
  next();

  while(peek() !== '"') {
    out += next();
  }

  next();

  return out;
}


function parseNumber(): number {
  let s = "";
  
   if(peek() === "-") s+= next();

   if(!/[0-9]/.test(peek())) throw new Error("Invalid number");

   while(/[0-9]/.test(peek())) s+= next();

   if(peek() == '.') {
    s+= next();
    if(!/[0-9]/.test(peek())) throw new Error("Invalid Fraction");
    while(/[0-9]/.test(peek())) s+= next();
  }

   if(peek() == "e" || peek() === "E") {
    s+= next();

    if(peek() == "+" || peek() === "-")
      s+= next();

    while(/[0-9]/.test(peek())) s+= next();
   }

   return Number(s);
}


function parseBoolean(): boolean {
  if(str.startsWith("true", i)) {i += 4; return true;}

  i += 5;

  return false;
}


function parseNull(): null {
  i += 4;
  return null;
}

return parseValue();

}

let str = '3.14'

console.log(parseJson(str));
