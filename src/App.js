import React, { useState } from 'react';
import './App.css';
import {PropertyCard} from './propertyCard';
import propertiesData from './properties.json';


function App() {
  // filter and search states
  const [searchTerm, setSearchTerm] = useState("")
  //taking locations from the json data
  
  const [locationFilter, setLocationFilter] = useState("All");
  // taking favourite locations
  const [favorites, setFavorites] = useState([]);
  


  const uniqueLocations = ["All", ...new Set(propertiesData.map(item => item.location))];

  const filteredProperties = propertiesData.filter((property) => {

  console.log("Search Term:", searchTerm);
  console.log("Location Filter:", locationFilter);

    
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "All" || property.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });
  console.log("PropertyCard is:", PropertyCard);

  //favorites function

  const addToFavorites = (property) =>{
    if(!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }else{
      alert("This property is already in your favorites!")
    }
  };

  // Remove component from favorites

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
  };

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

                    {favorites.length > 0 && (
          <div style={{ padding: '20px', backgroundColor: '#e0f7fa', marginBottom: '30px', marginTop: '20px', borderRadius: '10px', border: '1px solid #b2ebf2' }}>
            <h2 style={{ color: '#006064', textAlign: 'center', marginTop: 0 }}>❤️ My Favorites ({favorites.length})</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
              {favorites.map((fav) => (
                <div key={fav.id} style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: 'white', borderRadius: '5px', width: '200px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <img src={fav.image} alt={fav.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '5px' }} />
                  <h4 style={{ fontSize: '16px', margin: '10px 0' }}>{fav.title}</h4>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromFavorites(fav.id)}
                    style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Remove ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {filteredProperties.length > 0 ? "Latest Properties" : "No properties found"}
        </h2>


        
        {/* Property List Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {filteredProperties.map((property) => (
            <PropertyCard 
            key={property.id} 
            property={property} 
            addToFavorites = {addToFavorites}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;