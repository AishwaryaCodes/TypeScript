// Deleting nodes from a binary tree and returning the resulting forest.

function delNodes(root: TreeNode | null, to_delete: number[]): TreeNode[] {

    const del = new Set<number>(to_delete);

    const forest: TreeNode[] = [];


    const dfs = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {
        if(!node) return null;

        const deleted = del.has(node.value);

        node.left = dfs(node.left, deleted);
        node.right = dfs(node.right, deleted);

        if(isRoot && !deleted) 
            forest.push(node);

        return deleted ? null : node;
    };

    dfs(root, true);

    return forest;

}