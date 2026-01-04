import React from 'react';
import './App.css';
import {PropertyCard} from './propertyCard';
import propertiesData from './properties.json';

function App() {
  console.log("PropertyCard is:", PropertyCard);
  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Estate Agent App</h1>
      </header>

      <main style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Latest Properties</h2>
        
        {/* Property List Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {propertiesData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;