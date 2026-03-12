function wordBreak(s: string, dic: string[]) : string[] {

    const wordSet = new Set(dic);

    const n = s.length;

    const memo = new Map<string, string[]> ();

    function dfs(sub: string): string[] {
        if(memo.has(sub)) return memo.get(sub)!

        const res: string[] = [];

        if(sub.length === 0) {
            res.push("");
            return res;
        }

        for(let i = 1; i <= sub.length; i++) {
            const prefix = sub.substring(0, i);

            if(wordSet.has(prefix)) {
                const suffixWays = dfs(sub.substring(i));

                for(const way of suffixWays) {
                    if(way === "") res.push(prefix);

                    else res.push(prefix + " " + way);
                }
            }
        }

        memo.set(sub, res);
        return res;
    }

    return dfs(s);
}

console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"]));