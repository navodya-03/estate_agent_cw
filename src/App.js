import React, { useState } from 'react';
import './App.css';
import {PropertyCard} from './propertyCard';
import propertiesData from './properties.json';

function App() {
  // filter and search states
  const [searchTerm, setSearchTerm] = useState("")
  console.log("PropertyCard is:", PropertyCard);
  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Estate Agent App</h1>
      </header>

      <main style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Latest Properties</h2>
                {/* Search Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
          
          {/* Search Input */}
          <input 
            type="text" 
            placeholder="Search what you need" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', width: '300px', fontSize: '16px' }}
          />
          </div>

        
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