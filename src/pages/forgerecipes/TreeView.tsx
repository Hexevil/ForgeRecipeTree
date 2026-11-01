import { useState } from "react";
import type { TreeViewProps } from "../../utils/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { isNodeChecked, leafPaths } from "../../utils/Functions";

function TreeView({node, path, checked, onToggle}: TreeViewProps){
    const [isOpen, setIsOpen] = useState(true);
    const isChecked = isNodeChecked(node, path, checked);

    return (
        <li className="w-100 tree-list">
            <div className={"gap-2 d-flex align-items-center tree-pill rarity-" + (node.rarity ?? "none").toLowerCase()} onClick={() => setIsOpen(!isOpen)}>
                <input
                    type="checkbox"
                    className="tree-check"
                    checked={isChecked}
                    onChange={() => onToggle(leafPaths(node, path), !isChecked)}
                    onClick={(e) => e.stopPropagation()}
                />
                <span className="tree-qty main-font-tree">
                    {node.quantity.toLocaleString('de-DE')}x
                </span>
                <img
                    src={import.meta.env.BASE_URL + node.icon}
                    alt=""
                    width={24}
                    height={24}
                    style={{ imageRendering: "pixelated" }}
                />
                <span className="tree-name main-font-tree">
                    {node.name}
                </span>
                {node.children.length > 0 && (
                    <FontAwesomeIcon className="tree-toggle-icon" icon={isOpen ? faChevronDown : faChevronRight} />
                )}
            </div>
            {node.children.length > 0 && (
                <ul className="tree-children" style={isOpen ? undefined : { display: "none" }}>
                    {node.children.map((child) => (
                        <TreeView 
                            key={child.id} 
                            node={child}
                            path={path + "/" + child.id}
                            checked={checked}
                            onToggle={onToggle}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default TreeView;