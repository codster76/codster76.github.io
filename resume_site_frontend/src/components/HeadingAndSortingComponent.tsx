import { itemType } from "../../../item";
import style from '../css_modules/ItemComponent.module.css';
import React, { useState } from 'react';

export interface HeadingAndSortingComponentProps
{
    items: itemType[],
    updateItems: Function
}

interface HeadingState
{
    currentHeading: string,
    updateHeading: Function,
    name: string,
    sortFunction: (a:itemType, b:itemType) => number // It's optional because you only need to provide a comparison function for non-strings
}

let lastModified: HeadingState;

const HeadingAndSortingComponent = (props: HeadingAndSortingComponentProps) =>
{
    const [nameHeading, updateNameHeading]: [string, Function] = useState('Name');
    const [descriptionHeading, updateDescriptionHeading]: [string, Function] = useState('Description');
    const [quantityHeading, updateQuantityHeading]: [string, Function] = useState('Quantity');
    const [valueHeading, updateValueHeading]: [string, Function] = useState('Value');
    const [weightHeading, updateWeightHeading]: [string, Function] = useState('Weight');

    // This array is made so that all of the states can be iterated through to display
    const stateList: HeadingState[] = [
        {currentHeading: nameHeading, updateHeading: updateNameHeading, name: 'Name', sortFunction: (a, b) => a.name.localeCompare(b.name)},
        {currentHeading: descriptionHeading, updateHeading: updateDescriptionHeading, name: 'Description', sortFunction: (a, b) => a.description.localeCompare(b.description)},
        {currentHeading: quantityHeading, updateHeading: updateQuantityHeading, name: 'Quantity', sortFunction: (a, b) => a.quantity - b.quantity},
        {currentHeading: valueHeading, updateHeading: updateValueHeading, name: 'Value', sortFunction: (a, b) => a.value - b.value},
        {currentHeading: weightHeading, updateHeading: updateWeightHeading, name: 'Weight', sortFunction: (a, b) => a.weight - b.weight}
    ]

    // To ensure lastModified always has a value
    if(lastModified === undefined)
    {
        lastModified = stateList[0];
    }

    const headingClickBehaviour = (states: HeadingState) =>
    {
        // Sort the array by the current heading
        props.updateItems([...props.items.sort(states.sortFunction)]); // I don't 100% know why the spread operator is necessary, but I think updateItems needs a brand new array to actually render again

        // Modify the heading names

        // Basically, if the last heading modified was the one that was clicked, cycle through the sorting types
        if(lastModified.name === states.name)
        {
            states.currentHeading === states.name ? states.updateHeading(states.name + '↓') : states.updateHeading(states.name);
            lastModified.currentHeading = lastModified.name;
        }
        else
        {
            lastModified.updateHeading(lastModified.name);
            lastModified.currentHeading = lastModified.name;
            states.currentHeading === states.name ? states.updateHeading(states.name + '↓') : states.updateHeading(states.name);
        }
        lastModified = {...states};
    }

    return (
        <div>
            <div className = {style.flexContainer}>
                {
                    stateList.map((state) =>
                    (
                        <div className = {style.flexItem} onClick={() => headingClickBehaviour(state)}>{state.currentHeading}</div>
                    ))
                }
            </div>
        </div>
    );
}

export default HeadingAndSortingComponent;