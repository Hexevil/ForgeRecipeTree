import type { TreeViewProps } from "../../utils/Types";

function TreeView({node}: TreeViewProps){
    return (
        <li>
            <div>
                {node.name} x{node.quantity}
            </div>
            {node.children.length > 0 && (
                <ul>
                    {node.children.map((child) => (
                        <TreeView key={child.id} node={child} />
                    ))}
                </ul>
            )}
            </li>
    );
}

export default TreeView;