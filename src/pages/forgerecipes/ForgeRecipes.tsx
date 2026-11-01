import { useEffect, useState } from "react";
import type { Items, TreeNode, ItemOption } from "../../utils/Types";
import TreeView from "../forgerecipes/TreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import Select, { type StylesConfig } from "react-select";

function ForgeRecipes(){
    const [itemsJson, setItemsJson] = useState<Items>({});
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [quantityInput, setQuantityInput] = useState<number>(1);

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
        const recipe = item.recipes[0];
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
            children: children
        }

    }

    const tree = selectedItem ? constructTreeNode(selectedItem, quantityInput) : null;
    const options : ItemOption[] = forgeItems.map((item) => ({
        value: item.id,
        label: item.name,
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

    return(
        <div>
            <div className="gap-3 p-3 d-flex justify-content-center align-items-center input-panel mb-3">
                <FontAwesomeIcon className="fs-1" icon={faScroll} /><span className="main-font-bold fs-1">Forge Recipes</span>
            </div>
            <div className="gap-3 p-3 d-flex justify-content-center align-items-center input-panel">
                <Select<ItemOption>
                    classNamePrefix="recipe-select"
                    options={options}
                    styles={selectStyles}
                    value={options.find((o) => o.value === selectedItem) ?? null}
                    onChange={(option) => setSelectedItem(option ? option.value : "")}
                    placeholder="Select an item..."
                    isSearchable
                    className="flex-grow-1"
                />
                <input className="dark-input" type="number" value={quantityInput} min="1" onChange={(e)=> setQuantityInput(Math.max(1, Number(e.target.value)))}/>
            </div>
            <div>
                {
                    tree === null ? (
                        <p>Nessun tree</p>
                    ):(
                        <TreeView node={tree}></TreeView>
                    )
                }
            </div>
        </div>
    );
}
export default ForgeRecipes;