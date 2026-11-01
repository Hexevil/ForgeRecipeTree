export type Recipe = {
  type: string;
  inputs?: string[];
  count?: number;
};

export type Item = {
  id: string;
  name: string;
  recipes: Recipe[];
  icon: string;
};

export type Items = Record<string, Item>;

export type TreeNode = {
    id: string;
    name: string;
    quantity: number;
    icon?: string;
    children: TreeNode[];
}

export type TreeViewProps = {
    node: TreeNode;
}

export type ItemOption = {
  value: string;
  label: string;
  icon?: string;
};