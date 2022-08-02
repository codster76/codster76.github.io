import React, { useEffect, useState } from 'react'; // useEffect runs right after rendering or whenever a value updates
import './App.css';
import { itemType } from '../../item'

// Components
import ItemComponent, { ItemComponentProps } from './components/ItemComponent';

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
    <div className="App">
      <ItemComponent item={itemList[Math.min(2,itemList.length)] /* Math.min in there basically doesn't allow you to put any number higher than the array length */} />
    </div>
  );
}

export default App;
