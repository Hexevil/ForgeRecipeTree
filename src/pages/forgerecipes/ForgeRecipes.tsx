import { useEffect, useState } from "react";
import type { Items, TreeNode, ItemOption } from "../../utils/Types";
import TreeView from "../forgerecipes/TreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import Select, { type StylesConfig } from "react-select";
import { createPortal } from "react-dom";

function ForgeRecipes(){
    const [itemsJson, setItemsJson] = useState<Items>({});
    const [selectedItem, setSelectedItem] = useState<string>(
        () => localStorage.getItem("gemvault-item") ?? ""
    );
    const [quantityInput, setQuantityInput] = useState<number>(() => {
        const saved = Number(localStorage.getItem("gemvault-quantity"));
        return saved >= 1 ? saved : 1;
    });
    const [checked, setChecked] = useState<Set<string>>(() => {
        const saved = localStorage.getItem("gemvault-checked");
        return new Set(saved ? JSON.parse(saved) : []);
    });
    const [showReset, setShowReset] = useState(false);

    useEffect(() => {
        if (!showReset) return;

        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previous;
        };
    }, [showReset]);

    useEffect(() => {
        localStorage.setItem("gemvault-item", selectedItem);
        localStorage.setItem("gemvault-quantity", String(quantityInput));
    }, [selectedItem, quantityInput]);

    useEffect(() => {
        localStorage.setItem("gemvault-checked", JSON.stringify([...checked]));
    }, [checked]);

    useEffect(() => {
        fetch("/recipes/recipes.json")
        .then((res) => res.json())
        .then((data) => setItemsJson(data));
    },[]);

    const forgeItems = Object.values(itemsJson).filter((item) =>
        item.recipes.some((recipe) => recipe.type === "forge")
    );

    const constructTreeNode = function(id:string, quantity:number) : TreeNode{
        const item = itemsJson[id];
        const recipe = item?.recipes[0];
        const inputs = recipe?.inputs ?? [];

        const children = inputs.map((input)=>{
            const formattedInput = input.split(":");
            const inputId = formattedInput[0];
            const inputQuantity = Number(formattedInput[1]) * quantity;

            return constructTreeNode(inputId, inputQuantity);
        });

        if(!item) return {id, name: id, quantity, children: []};

        return {
            id: item.id,
            name: item.name,
            quantity: quantity,
            icon: item.icon,
            children: children
        }

    }

    const tree = selectedItem ? constructTreeNode(selectedItem, quantityInput) : null;
    const options : ItemOption[] = forgeItems.map((item) => ({
        value: item.id,
        label: item.name,
        icon: item.icon,
    }));

    const selectStyles: StylesConfig<ItemOption, false> = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#141414",
            borderColor: state.isFocused ? "#d8a7ff" : "#333",
            borderRadius: 8,
            minHeight: "2.8rem",
            boxShadow: "none",
            "&:hover": { borderColor: state.isFocused ? "#d8a7ff" : "#444" },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#141414",
            border: "1px solid #333",
            borderRadius: 8,
            overflow: "hidden",
        }),
        menuList: (base) => ({
            ...base,
            padding: 4,
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "rgba(216, 167, 255, 0.12)" : "transparent",
            color: "#d4d4d4",
            borderRadius: 6,
            cursor: "pointer",
            ":active": { backgroundColor: "rgba(216, 167, 255, 0.2)" },
        }),
        singleValue: (base) => ({
            ...base,
            color: "#d4d4d4",
        }),
        input: (base) => ({
            ...base,
            color: "#d4d4d4",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#777",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#999",
            "&:hover": { color: "#ccc" },
        }),
    };

    const formatOptionLabel = (option: ItemOption) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {option.icon && (
            <img
                src={import.meta.env.BASE_URL + option.icon}
                alt=""
                width={24}
                height={24}
                style={{ imageRendering: "pixelated" }}
            />
            )}
            <span>{option.label}</span>
        </div>
    );

    const toggleChecked = (path: string) => {
        setChecked((previous) => {
            const next = new Set(previous);
            if (next.has(path)) {
            next.delete(path);
            } else {
            next.add(path);
            }
            return next;
        });
    };

    const resetChecked = () => {
        setChecked((previous) => {
            const next = new Set<string>();
            previous.forEach((path) => {
            const belongsToThisRecipe =
                path === selectedItem || path.startsWith(selectedItem + "/");
            if (!belongsToThisRecipe) {
                next.add(path);
            }
            });
            return next;
        });
        setShowReset(false);
    };

    return(
        <div>
            <div className="gap-3 p-3 d-flex justify-content-center align-items-center mb-3">
                <FontAwesomeIcon className="fs-1" icon={faScroll} /><span className="main-font-bold fs-1">Forge Recipes</span>
            </div>
            <div className="gap-3 p-3 d-flex justify-content-center align-items-center input-panel mb-3">
                <Select<ItemOption>
                    classNamePrefix="recipe-select"
                    formatOptionLabel={formatOptionLabel}
                    options={options}
                    styles={selectStyles}
                    value={options.find((o) => o.value === selectedItem) ?? null}
                    onChange={(option) => setSelectedItem(option ? option.value : "")}
                    placeholder="Select an item..."
                    isClearable
                    isSearchable
                    className="flex-grow-1"
                />
                <input className="dark-input" type="number" value={quantityInput} min="1" onChange={(e)=> setQuantityInput(Math.max(1, Number(e.target.value)))}/>
            </div>
            <div className="p-3 justify-content-center align-items-center input-panel-reverse flex-column flex-grow-1">
                {
                    selectedItem && (
                        <div className="d-flex justify-content-between align-items-center mb-3 bottom-separator">
                            <span className="tree-title mb-2 main-font-tree">Recipe Tree</span>
                            <button className="reset-btn mb-2 main-font-tree" onClick={() => setShowReset(true)}>
                                Reset checklist
                            </button>
                        </div>
                    )
                }
                {
                    tree === null ? (
                        <div className="main-font-normal text-center w-100">No recipe found</div>
                    ):(
                        <TreeView 
                            node={tree}
                            path={tree.id}
                            checked={checked}
                            onToggle={toggleChecked}
                        />
                    )
                }
            </div>
            {showReset &&
                createPortal(
                    <>
                    <div className="modal-backdrop fade show reset-backdrop" onClick={() => setShowReset(false)}></div>
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog" onClick={() => setShowReset(false)}>
                        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content reset-modal">
                            <div className="modal-body main-font-tree">
                            Reset all checkmarks for this recipe? This cannot be undone.
                            </div>
                            <div className="modal-footer main-font-tree">
                            <button className="cancel-btn" onClick={() => setShowReset(false)}>
                                Cancel
                            </button>
                            <button className="reset-btn reset-btn-solid main-font-tree" onClick={resetChecked}>
                                Yes, reset
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </>,
                    document.body
                )
            }
        </div>
    );
}
export default ForgeRecipes;