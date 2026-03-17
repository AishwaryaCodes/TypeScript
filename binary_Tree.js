// Deleting nodes from a binary tree and returning the resulting forest.

// A binary tree with root root

// An array to_delete containing values of nodes that must be removed

// When a node is deleted:

// Its children become new roots of separate trees (if they are not also deleted)

// Your goal is to return the list of roots of all remaining trees after deletions.

// This list is called the forest.


function delNodes(root: TreeNode | null, to_delete: number[]): TreeNode[] {

    const del = new Set<number>(to_delete); // Set for quick lookup

    const forest: TreeNode[] = []; // forest array - store the resulting trees


    const dfs = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {

        if(!node) return null; // if node dosent exist - stop recursion.

        const deleted = del.has(node.value); // check in set 

        // check childred 
        node.left = dfs(node.left, deleted);

        node.right = dfs(node.right, deleted);

        // if node is not deleted - then add in the forest result
        if(isRoot && !deleted) 
            forest.push(node);

        return deleted ? null : node;
    };

    dfs(root, true);

    return forest;

}

let tree = [1, 2, 3, 4, 5, null, 6];

let to_delete = [3,5]; 

//o/p = [1,6]


// TC : O(N) - N is number of node

// SC : O(H) - H is height of tree.