import { itemType } from "../../../item";
import style from '../css_modules/ItemComponent.module.css';
import React, { useState } from 'react';

export interface HeadingAndSortingComponentProps
{
    items: itemType[],
    updateItems: Function
}

interface headingState
{
    isString: boolean,
    currentHeading: string,
    updateHeading: Function,
    name: string,
    headingType: itemType
}

const HeadingAndSortingComponent = (props: HeadingAndSortingComponentProps) =>
{
    const [nameHeading, updateNameHeading]: [string, Function] = useState('Name');
    const [descriptionHeading, updateDescriptionHeading]: [string, Function] = useState('Description');
    const [quantityHeading, updateQuantityHeading]: [string, Function] = useState('Quantity');
    const [valueHeading, updateValueHeading]: [string, Function] = useState('Value');
    const [weightHeading, updateWeightHeading]: [string, Function] = useState('Weight');

    const stateList: headingState[] = [
        {isString: true, currentHeading: nameHeading, updateHeading: updateNameHeading, name: 'Name'},
        {isString: true, currentHeading: descriptionHeading, updateHeading: updateDescriptionHeading, name: 'Description'},
        {isString: false, currentHeading: quantityHeading, updateHeading: updateQuantityHeading, name: 'Quantity'},
        {isString: false, currentHeading: valueHeading, updateHeading: updateValueHeading, name: 'Value'},
        {isString: false, currentHeading: weightHeading, updateHeading: updateWeightHeading, name: 'Weight'},
    ]

    const sortItemArray = (isString: boolean, compareFunction?: (a:itemType, b:itemType) => number) => // '(a:itemType, b:itemType) => number' specifies the type of function.
    {
        if(isString)
        {
            props.updateItems([...props.items.sort()]);
        }
        else
        {
            props.updateItems([...props.items.sort(compareFunction)]); // I don't 100% know why the spread operator is necessary, but I think updateItems needs a brand new array to actually render again
        }
    }

    const headingClickBehaviour = (states: headingState) =>
    {
        if(states.isString)
        {
            sortItemArray(states.isString);
        }
        else
        {
            sortItemArray(states.isString, (a:itemType, b:itemType) => a.value - b.value); // I just realised that my components don't know which itemType property to sort
        }

        // Toggle the ↓ in the heading whenever it's clicked
        states.currentHeading === states.name ? states.updateHeading(states.name + '↓') : states.updateHeading(states.name);
    }

    return (
        <div>
            <div className = {style.flexContainer}>
                {
                    stateList.map((states) =>
                    (
                        <div className = {style.flexItem} onClick={() => headingClickBehaviour(states)}>{states.currentHeading}</div>
                    ))
                }
            </div>
        </div>
    );
}

/*
<div className = {style.flexItem} onClick={() => {
                    sortItemArray(true);
                    nameHeading === 'Name' ? updateNameHeading('Name↓') : updateNameHeading('Name');
                    }}>
                    {nameHeading}
                </div>

                <div className = {style.flexItem} onClick={() => {
                    sortItemArray(true, (a:itemType, b:itemType) => a.value - b.value);
                    descriptionHeading === 'Description' ? updatedescriptionHeading('Description↓') : updateNameHeading('Name')
                    }}>
                    {descriptionHeading}
                </div>

                <div className = {style.flexItem} onClick={() => sortItemArray(false, (a:itemType, b:itemType) => a.quantity - b.quantity)}>{sortBy === 'Quantity' ? 'Quantity↓' : 'Quantity'}</div>
                <div className = {style.flexItem} onClick={() => sortItemArray(false, (a:itemType, b:itemType) => a.value - b.value)}>{sortBy === 'Value' ? 'Value↓' : 'Value'}</div>
                <div className = {style.flexItem} onClick={() => sortItemArray(false, (a:itemType, b:itemType) => a.weight - b.weight)}>{sortBy === 'Weight' ? 'Weight↓' : 'Weight'}</div>
*/

export default HeadingAndSortingComponent;