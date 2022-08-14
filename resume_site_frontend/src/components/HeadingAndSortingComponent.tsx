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
    sortFunctionAscending: (a:itemType, b:itemType) => number,
    sortFunctionDescending: (a:itemType, b:itemType) => number,
    sortingState: sortingStates
}

type sortingStates = "unsorted" | "ascending" | "descending";

let lastModified: HeadingState;
let stateList: HeadingState[];

// To add a new heading, just add a new state, then add that state to the stateList

const HeadingAndSortingComponent = (props: HeadingAndSortingComponentProps) =>
{
    const [nameHeading, updateNameHeading]: [string, Function] = useState('Name');
    const [descriptionHeading, updateDescriptionHeading]: [string, Function] = useState('Description');
    const [quantityHeading, updateQuantityHeading]: [string, Function] = useState('Quantity');
    const [valueHeading, updateValueHeading]: [string, Function] = useState('Value');
    const [weightHeading, updateWeightHeading]: [string, Function] = useState('Weight');

    // This array is made so that all of the states can be iterated through to display
    // These if statements are necessary because react will rerun this code and redeclare these variables
    if(!stateList) {
        stateList = [
            {
                currentHeading: nameHeading,
                updateHeading: updateNameHeading,
                name: 'Name',
                sortFunctionAscending: (a, b) => a.name.localeCompare(b.name),
                sortFunctionDescending: (a, b) => b.name.localeCompare(a.name),
                sortingState: "unsorted"
            },
            {
                currentHeading: descriptionHeading,
                updateHeading: updateDescriptionHeading,
                name: 'Description',
                sortFunctionAscending: (a, b) => a.description.localeCompare(b.description),
                sortFunctionDescending: (a, b) => b.description.localeCompare(a.description),
                sortingState: "unsorted"
            },
            {
                currentHeading: quantityHeading,
                updateHeading: updateQuantityHeading,
                name: 'Quantity',
                sortFunctionAscending: (a, b) => a.quantity - b.quantity,
                sortFunctionDescending: (a, b) => b.quantity - a.quantity,
                sortingState: "unsorted"
            },
            {
                currentHeading: valueHeading,
                updateHeading: updateValueHeading,
                name: 'Value',
                sortFunctionAscending: (a, b) => a.value - b.value,
                sortFunctionDescending: (a, b) => b.value - a.value,
                sortingState: "unsorted"
            },
            {
                currentHeading: weightHeading,
                updateHeading: updateWeightHeading,
                name: 'Weight',
                sortFunctionAscending: (a, b) => a.weight - b.weight,
                sortFunctionDescending: (a, b) => b.weight - a.weight,
                sortingState: "unsorted"
            }
        ]
    }

    // To ensure lastModified always has a value
    if(!lastModified)
    {
        lastModified = stateList[0];
    }

    const headingClickBehaviour = (currentState: HeadingState) =>
    {
        console.log(lastModified);
        // Basically, if the last heading modified was the one that was clicked, cycle through the sorting types
        if(lastModified.name === currentState.name)
        {
            switch(currentState.sortingState)
            {
                case "unsorted":
                    console.log('1');
                    currentState.updateHeading(currentState.name + '↓');
                    currentState.currentHeading = currentState.name + '↓'; // I really don't know why updating the state doesn't update the labels, but whatever
                    currentState.sortingState = 'ascending';
                    props.updateItems([...props.items.sort(currentState.sortFunctionAscending)]);
                    break;
                case "ascending":
                    console.log('2');
                    currentState.updateHeading(currentState.name + '↑');
                    currentState.currentHeading = currentState.name + '↑';
                    currentState.sortingState = 'descending';
                    props.updateItems([...props.items.sort(currentState.sortFunctionDescending)]);
                    break;
                case "descending":
                    console.log('3');
                    currentState.updateHeading(currentState.name + '↓');
                    currentState.currentHeading = currentState.name + '↓';
                    currentState.sortingState = 'ascending';
                    props.updateItems([...props.items.sort(currentState.sortFunctionAscending)]);
                    break;
            }
        }
        else
        {
            props.updateItems([...props.items.sort(currentState.sortFunctionAscending)]);
            lastModified.updateHeading(lastModified.name);
            lastModified.sortingState = 'unsorted';
            currentState.sortingState = 'ascending';
            lastModified.currentHeading = lastModified.name;
            currentState.updateHeading(currentState.name + '↓');
            currentState.currentHeading = currentState.name + '↓';
        }
        lastModified = currentState;
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