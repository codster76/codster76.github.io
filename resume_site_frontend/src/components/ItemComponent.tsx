import { itemType } from "../../../item";
import style from '../css_modules/ItemComponent.module.css';

export interface ItemComponentProps
{
    item: itemType
}

const ItemComponent = (props: ItemComponentProps) =>
{
    return (
        <div>
            <div className = {style.flexContainer}>
                <div className = {style.flexItem}>{props.item.name}</div>
                <div className = {style.flexItem}>{props.item.description}</div>
                <div className = {style.flexItem}>{props.item.quantity}</div>
                <div className = {style.flexItem}>{props.item.value}</div>
                <div className = {style.flexItem}>{props.item.weight}</div>
            </div>
        </div>
    );
}

export default ItemComponent;