import React, { useState } from 'react';
import './App.css';
import {PropertyCard} from './propertyCard';
import propertiesData from './properties.json';


function App() {
  // filter and search states
  const [searchTerm, setSearchTerm] = useState("")
  //taking locations from the json data
  
  const [locationFilter, setLocationFilter] = useState("All");


  const uniqueLocations = ["All", ...new Set(propertiesData.map(item => item.location))];

  const filteredProperties = propertiesData.filter((property) => {

  console.log("Search Term:", searchTerm);
  console.log("Location Filter:", locationFilter);

    
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "All" || property.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });
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
          

        {/*Dropdown list*/}

        <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          >
            {uniqueLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>

          </div>

          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {filteredProperties.length > 0 ? "Latest Properties" : "No properties found"}
        </h2>


        
        {/* Property List Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;