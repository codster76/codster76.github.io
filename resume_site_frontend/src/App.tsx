import React, { useEffect, useState } from 'react'; // useEffect runs right after rendering or whenever a value updates
import { itemType } from '../../item';
import styles from './css_modules/App.module.css';

// Components
import ItemComponent, { ItemComponentProps } from './components/ItemComponent';
import ModalComponent, { ModalComponentProps } from './components/modalComponent';
import ItemListComponent from './components/ItemListComponent';
import HeadingAndSortingComponent from './components/HeadingAndSortingComponent';

function App() {
  const [itemList, updateItemList]: [itemType[], Function] = useState([
    {
      id: '0',
      name: 'default',
      description: 'default',
      value: 0,
      weight: 0,
      quantity: 0
    }
  ]);

  const [displayModal, updateDisplayModal]: [boolean, Function] = useState(false);

  const [sortingFunction, updateSortingFunction]: [Function, Function] = useState(() => (a: itemType, b: itemType) => parseInt(a.id) - parseInt(b.id)); // Needs to take a function in a function for some reason

  const labels: itemType = 
  {
    id: 'id',
    name: 'name',
    description: 'description',
    value: 0,
    weight: 0,
    quantity: 0
  }

  // This basically runs right after rendering and fetches the item data
  useEffect(() => 
  {
    const getItems = async () =>
    {
      const itemsFromServer = await fetchItems();
      updateItemList([...itemsFromServer]);
    }

    getItems();
  }, []); // You can put dependency values in this array, which can run this code whenever that value changes

  const fetchItems = async () =>
  {
    const res = await fetch('http://localhost:5000/api/items');
    const items = await res.json();
    
    return items;
  }

  return (
    <div className={styles.main}>
      <HeadingAndSortingComponent items={itemList} updateItems={updateItemList}/>
      <ItemListComponent itemArray={itemList}/>
      <ModalComponent displayModal={displayModal} updateDisplayModal={updateDisplayModal}/>
      <button onClick={() => updateItemList([{id: 7, name: 'test', description: 'test', value: 1, weight: 2, quantity: 3}])}>TestButton</button>
    </div>
  );

  //<ItemComponent item={itemList[Math.min(0,itemList.length)] /* Math.min in there basically doesn't allow you to put any number higher than the array length */} />
  //<button onClick={updateItemList([{id: 7, name: 'test', description: 'test', value: 1, weight: 2, quantity: 3}])}>TestButton</button>
}

export default App;
