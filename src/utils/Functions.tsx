import type { TreeNode } from "./Types";

export function leafPaths(node: TreeNode, path: string): string[] {
  if (node.children.length === 0) {
    return [path];
  }
  return node.children.flatMap((child) =>
    leafPaths(child, path + "/" + child.id)
  );
}

export function isNodeChecked(node: TreeNode, path: string, checked: Set<string>): boolean {
  if (node.children.length === 0) {
    return checked.has(path);
  }
  return node.children.every((child) =>
    isNodeChecked(child, path + "/" + child.id, checked)
  );
}