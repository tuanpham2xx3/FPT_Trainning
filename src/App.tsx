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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="menu-container">
      <h2>Menu Items</h2>
      <div className="form-group">
        <label htmlFor="menuItem" className="form-label">
          Menu Item Name <span className="required">*</span>
        </label>
        <div className="input-group">
          <input
            id="menuItem"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter menu item"
            className="menu-input"
          />
          <button 
            onClick={handleAddItem} 
            className="add-button"
            disabled={!inputValue.trim()}
          >
            <span className="button-icon">+</span>
            <span className="button-text">Add Item</span>
          </button>
        </div>
      </div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {menuItems.length === 0 && (
        <div className="empty-state">
          No items added yet. Start by adding some items above!
        </div>
      )}
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
