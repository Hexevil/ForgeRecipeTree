import { useEffect, useState } from "react";
import type { Items, TreeNode } from "../../utils/Types";
import TreeView from "../forgerecipes/TreeView";

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

    return(
        <div>
            <div>
                <select onChange={(e)=> setSelectedItem(e.target.value)}>
                    <option key="" value="">-- Select an item --</option>
                    {
                        forgeItems.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }
                </select>
                <input type="number" value={quantityInput} min="1" onChange={(e)=> setQuantityInput(Math.max(1, Number(e.target.value)))}/>
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