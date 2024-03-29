import { itemType } from "../../../item";
import style from '../css_modules/ItemComponent.module.css';
import ItemComponent from "./ItemComponent";

// Component that contains all item components

export interface ItemListComponentProps
{
    itemArray: itemType[]
}

const ItemListComponent = (props: ItemListComponentProps) =>
{
    return (
        <div>
            {props.itemArray.map((item) => 
                <ItemComponent item={item} />
            )}
        </div>
    );
}

export default ItemListComponent;