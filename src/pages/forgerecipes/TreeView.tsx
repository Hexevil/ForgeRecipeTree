import { useState } from "react";
import type { TreeViewProps } from "../../utils/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";

function TreeView({node}: TreeViewProps){
    const [isOpen, setIsOpen] = useState(true);


    return (
        <li className="w-100 tree-list">
            <div className="d-flex align-items-center tree-pill" onClick={() => setIsOpen(!isOpen)}>
                <span className="tree-qty main-font-normal">
                    {node.quantity}x
                </span>
                <img
                    src={node.icon}
                    alt=""
                    width={24}
                    height={24}
                    style={{ imageRendering: "pixelated" }}
                />
                <span className="tree-name main-font-normal">
                    {node.name}
                </span>
                {node.children.length > 0 && (
                    <FontAwesomeIcon className="tree-toggle-icon" icon={isOpen ? faChevronDown : faChevronRight} />
                )}
            </div>
            {node.children.length > 0 && isOpen && (
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