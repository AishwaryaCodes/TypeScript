// Merge Two Binary Trees

// Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

// Return the merged tree.

// Note: The merging process must start from the root nodes of both trees.


// Example 1:
// Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
// Output: [3,4,5,5,4,null,7]

//TreeNode Defination 

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function mergeTrees(t1: TreeNode | null, t2: TreeNode | null): TreeNode | null {

  if(!t1 || !t2) return t1 || t2;

  const stack: Array<[TreeNode | null, TreeNode | null]> = [[t1, t2]];

  while(stack.length) {
    const [n1, n2] = stack.pop()!;
    if(!n1 || !n2) continue;
    n1.val += n2.val;
 // left children
    if (!n1.left) {
      n1.left = n2.left;
    } else {
      stack.push([n1.left, n2.left]);
    }

    // right children
    if (!n1.right) {
      n1.right = n2.right;
    } else {
      stack.push([n1.right, n2.right]);
    }
  }

  return t1;
}

// ---------- Helpers to build and print trees ----------
function buildTree(arr: Array<number | null>): TreeNode | null {
  if (!arr.length || arr[0] == null) return null;
  const root = new TreeNode(arr[0]!);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift()!;
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal != null) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal != null) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }
  return root;
}

function serialize(root: TreeNode | null): Array<number | null> {
  if (!root) return [];
  const result: Array<number | null> = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  // trim trailing nulls
  while (result.length && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

// ---------- Example run ----------
const root1Arr = [1, 3, 2, 5];
const root2Arr = [2, 1, 3, null, 4, null, 7];

const t1 = buildTree(root1Arr);
const t2 = buildTree(root2Arr);

const merged = mergeTrees(t1, t2);
console.log("Merged Tree (as array):", serialize(merged));