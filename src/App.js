import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/MenuBar';
import Routing from './components/Routing';
import Dropdown from './components/DropdownMenu';
import Covid19 from './components/Covid19';

function App() {
  return (
    <div className="App">
      <Covid19 />
    </div>
  );
}

export default App;
