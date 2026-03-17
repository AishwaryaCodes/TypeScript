// Inverted Document Instead of storing documents and scanning all of them every time, we build an inverted index.
// Implement folllowing functions:
//   insert(String doc)
//   search(String term)
//   delete(String doc)
//   andSerach(String term1, String term2)


// Type alias for document ids
type DocId = number; 

class InvertedSearch {

  // 3 - Maps 
  private index: Map<string, Set<DocId>> = new Map(); // term -> set of document Ids:  hello -> {2}

  private docs: Map<DocId, string> = new Map(); // Id, Document Text: 1 -> "Hello world"

  private contentToIds: Map<string, Set<DocId>> = new Map(); // Document Text , Id  "Hello world" -> {1}


  private nextId = 1;

  // tok function converts text into searchable words
  private static tok(s: string): string[] {                       // "hello world"
    return s.toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean); // ["hello", "word"]
  }
   

  // Insert Function - Add Document to Index
  insert(doc:string):number {
  const id = this.nextId++; // generate new docs ID

  this.docs.set(id, doc); // store document

  if(!this.contentToIds.has(doc)) this.contentToIds.set(doc, new Set());
  this.contentToIds.get(doc)!.add(id);

  const terms = new Set(InvertedSearch.tok(doc));
  for(const t of terms) {
    if(!this.index.has(t)) this.index.set(t, new Set());
    this.index.get(t)!.add(id);
  }
  return id;
  }


  search(term: string): string[] {
    const t = term.trim().toLowerCase();
    if(!t) return [];

    const ids = this.index.get(t);
    if(!ids || ids.size === 0) return [];

    return Array.from(new Set(Array.from(ids).map((id) => this.docs.get(id) !)))
  }


  delete(doc: string): number {
    const ids = this.contentToIds.get(doc);
   if(!ids || ids.size === 0) return 0;

   const terms = new Set(InvertedSearch.tok(doc));

   let removed = 0;

   for(const id of ids) {
    for(const term of terms) {
      const posting = this.index.get(term);
      if(posting) {
        posting.delete(id);
        if(posting.size === 0) this.index.delete(term);
      }
    }
    this.docs.delete(id);
    removed++;
   }

   this.contentToIds.delete(doc);
   return removed;
  }


  andSearch(term1: string, term2: string): string[] {
    const a = term1.trim().toLowerCase();
    const b = term2.trim().toLowerCase();

    if(!a || !b) return [];

    const A = this.index.get(a);
    const B = this.index.get(b);

    if(!A || !B || A.size === 0 || B.size === 0 ) return [];

    const [small, large] = A.size < B.size ? [A, B] : [B,A];
    const outIds: DocId[] = [];

    for(const id of small) {
      if(large.has(id)) outIds.push(id);
    }

    return Array.from(new Set(outIds.map((id) => this.docs.get(id)!)));
  }

}

const idx = new InvertedSearch();
idx.insert("MongoDB makes working with data easy");
idx.insert("Node.js driver for MongoDB");

console.log(idx.search("driver"));


//console.log(idx.delete("Node.js driver for MongoDB"));
//console.log(idx.search("driver"));