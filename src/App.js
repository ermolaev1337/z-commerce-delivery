import React from 'react';
import DeliveryForm from './DeliveryForm';
import "./App.css";


const App = () => {
  // Replace with the actual item ID passed from the e-commerce platform
  const itemID = '12345';

  return (
      <div className="App">
        <DeliveryForm itemID={itemID} />
      </div>
  );
}

export default App;