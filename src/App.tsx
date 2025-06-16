import React from 'react';
import './App.css';

interface MenuItem {
  id: number;
  name: string;
}

function Menu() {
  const [inputValue, setInputValue] = React.useState('');
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newItem: MenuItem = {
        id: Date.now(),
        name: inputValue.trim()
      };
      setMenuItems([...menuItems, newItem]);
      setInputValue(''); // Reset input after adding
    }
  };

  return (
    <div className="menu-container">
      <h2>Menu Items</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter menu item"
          className="menu-input"
        />
        <button onClick={handleAddItem} className="add-button">
          Add Item
        </button>
      </div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu />
      </header>
    </div>
  );
}

export default App;
