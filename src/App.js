import React from 'react';
import DeliveryForm from './DeliveryForm';
import "./App.css";


const App = () => {
    const searchParams = new URLSearchParams(document.location.search)

    return (
        <div className="App">
            <DeliveryForm itemID={searchParams.get("id") }/>
        </div>
    );
}

export default App;