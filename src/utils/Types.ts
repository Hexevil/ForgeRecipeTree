export type Recipe = {
  type: string;
  inputs?: string[];
  count?: number;
};

export type Item = {
  id: string;
  name: string;
  recipes: Recipe[];
};

export type Items = Record<string, Item>;

export type TreeNode = {
    id: string;
    name: string;
    quantity: number;
    children: TreeNode[];
}

export type TreeViewProps = {
    node: TreeNode;
}