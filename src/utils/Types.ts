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
  rarity?: string;
};

export type Items = Record<string, Item>;

export type TreeNode = {
    id: string;
    name: string;
    quantity: number;
    icon?: string;
    rarity?: string;
    children: TreeNode[];
}

export type TreeViewProps = {
    node: TreeNode;
    path: string;
    checked: Set<string>;
    onToggle: (paths: string[], value: boolean) => void;
}

export type ItemOption = {
  value: string;
  label: string;
  icon?: string;
  rarity?: string;
};