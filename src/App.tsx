import React, { useState, useEffect } from 'react';
import './App.css';

interface MenuItem {
  id: number;
  name: string;
}

function Menu() {
  const [inputValue, setInputValue] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  // Handle input validation and error messages
  const validateInput = (value: string) => {
    if (value.length < 3) {
      setError('Item name must be at least 3 characters long');
      return false;
    }
    if (menuItems.some(item => item.name.toLowerCase() === value.toLowerCase())) {
      setError('This item already exists');
      return false;
    }
    setError('');
    return true;
  };

  // Handle adding new items
  const handleAddItem = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && validateInput(trimmedValue)) {
      const newItem: MenuItem = {
        id: Date.now(),
        name: trimmedValue
      };
      setMenuItems(prev => [...prev, newItem]);
      setInputValue('');
    }
  };

  // Handle key press events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  // Handle item deletion
  const handleDeleteItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Filter items based on search term
  useEffect(() => {
    const filtered = menuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, menuItems]);

  return (
    <div className="menu-container">
      <h2>Menu Items</h2>
      
      {/* Add Item Section */}
      <div className="input-section">
        <div className="input-group">
          <div className="form-field">
            <label htmlFor="menuItem" className="input-label">
              Menu Item Name
              <span className="required">*</span>
            </label>
            <input
              id="menuItem"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                validateInput(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter menu item name"
              className={`menu-input ${error ? 'input-error' : ''}`}
              aria-invalid={!!error}
              aria-describedby={error ? "menuItemError" : undefined}
            />
            {error && (
              <div id="menuItemError" className="error-message" role="alert">
                {error}
              </div>
            )}
          </div>
          <button 
            onClick={handleAddItem} 
            className="add-button"
            disabled={!inputValue.trim() || !!error}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Search Section */}
      {menuItems.length > 0 && (
        <div className="search-section">
          <div className="form-field">
            <label htmlFor="searchItem" className="input-label">
              Search Items
            </label>
            <input
              id="searchItem"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search items..."
              className="search-input"
              aria-label="Search menu items"
            />
          </div>
        </div>
      )}

      {/* Items List */}
      <ul className="menu-list" role="list">
        {(searchTerm ? filteredItems : menuItems).map((item) => (
          <li key={item.id} className="menu-item">
            <span className="item-name">{item.name}</span>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="delete-button"
              aria-label={`Delete ${item.name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {menuItems.length === 0 && (
        <div className="empty-state" role="status">
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
