import { itemType } from "../../../item";

export interface ItemComponentProps
{
    item: itemType
}

const ItemComponent = (props: ItemComponentProps) =>
{
    return (
        <div>
            <ul>
                <li>{props.item.name}</li>
                <li>{props.item.description}</li>
                <li>{props.item.quantity}</li>
                <li>{props.item.value}</li>
                <li>{props.item.weight}</li>
            </ul>
        </div>
    );
}

export default ItemComponent;