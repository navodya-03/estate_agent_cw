import React, { useState } from 'react';
import './App.css';
import { PropertyCard } from './propertyCard';
import propertiesData from './properties.json';

// --- 1. DETAILED VIEW COMPONENT ---
function PropertyDetails({ property, onBack, addToFavorites, allProperties }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('desc');

  const otherImagesFallback = allProperties
    .filter(p => p.id !== property.id)
    .map(p => p.image)
    .slice(0, 5);

  const images = (property.images && property.images.length > 0) 
    ? property.images 
    : [property.image, ...otherImagesFallback];

  const nextImage = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const getMapSrc = (location) => {
    const loc = location === "All" ? "Sri Lanka" : location;
    return `https://maps.google.com/maps?q=$?q=${loc}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        ⬅ Back to Results
      </button>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px' }}>
             <div style={{ position: 'relative', height: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                <img src={images[currentImage]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={prevImage} style={{ position: 'absolute', top: '50%', left: '10px', fontSize: '24px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}>❮</button>
                <button onClick={nextImage} style={{ position: 'absolute', top: '50%', right: '10px', fontSize: '24px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}>❯</button>
             </div>
             <h1>{property.title}</h1>
             <h2 style={{ color: '#27ae60' }}>Rs. {property.price.toLocaleString()}</h2>
             <p><strong>Type:</strong> {property.type} | <strong>Tenure:</strong> {property.tenure} | <strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
             <button onClick={() => addToFavorites(property)} style={{ padding: '12px 24px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
                Add to Favorites ❤️
             </button>
        </div>

        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginBottom: '10px', borderBottom: '2px solid #ddd' }}>
                <button onClick={() => setActiveTab('desc')} style={{ flex: 1, padding: '10px', background: activeTab === 'desc' ? '#2c3e50' : '#f1f1f1', color: activeTab === 'desc' ? '#fff' : '#333', border: 'none', cursor: 'pointer' }}>Description</button>
                <button onClick={() => setActiveTab('floor')} style={{ flex: 1, padding: '10px', background: activeTab === 'floor' ? '#2c3e50' : '#f1f1f1', color: activeTab === 'floor' ? '#fff' : '#333', border: 'none', cursor: 'pointer' }}>Floor Plan</button>
                <button onClick={() => setActiveTab('map')} style={{ flex: 1, padding: '10px', background: activeTab === 'map' ? '#2c3e50' : '#f1f1f1', color: activeTab === 'map' ? '#fff' : '#333', border: 'none', cursor: 'pointer' }}>Map</button>
            </div>
            <div style={{ padding: '20px', background: '#fff', borderRadius: '0 0 5px 5px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', flex: 1 }}>
                {activeTab === 'desc' && (
                    <div>
                        <h3>Description</h3>
                        <p style={{ lineHeight: '1.6' }}>{property.description}</p>
                        <ul style={{ marginTop: '10px' }}>
                            <li>Bedrooms: {property.bedrooms}</li>
                            <li>Location: {property.location}</li>
                        </ul>
                    </div>
                )}
                {activeTab === 'floor' && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <h3>Floor Plan</h3>
                        <p>Floor plan not available.</p>
                        <div style={{ width: '100%', height: '200px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>[Floor Plan Placeholder]</div>
                    </div>
                )}
                {activeTab === 'map' && (
                    <div style={{ height: '100%' }}>
                        <h3>Location Map</h3>
                        <iframe title="Tab Map" width="100%" height="300px" src={getMapSrc(property.location)} style={{ border: 0 }} allowFullScreen></iframe>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. MAIN APP COMPONENT ---
function App() {
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [dateAfter, setDateAfter] = useState("");

  const uniqueLocations = ["All", ...new Set(propertiesData.map(item => item.location))];
  const uniqueTypes = ["All", ...new Set(propertiesData.map(item => item.type))];

  // Logic
  const filteredProperties = propertiesData.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "All" || property.location === locationFilter;
    const matchesType = typeFilter === "All" || property.type === typeFilter;
    const priceVal = property.price;
    const matchesMinPrice = minPrice === "" || priceVal >= parseInt(minPrice);
    const matchesMaxPrice = maxPrice === "" || priceVal <= parseInt(maxPrice);
    const matchesBeds = minBeds === "" || property.bedrooms >= parseInt(minBeds);
    const matchesDate = dateAfter === "" || property.added.year >= parseInt(dateAfter);

    return matchesSearch && matchesLocation && matchesType && matchesMinPrice && matchesMaxPrice && matchesBeds && matchesDate;
  });

  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
      alert("Added to Favorites! ❤️");
    } else {
      alert("Already in favorites!");
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const getMapSrc = (location) => {
    const loc = location === "All" ? "Sri Lanka" : location;
    return `https://maps.google.com/maps?q=$?q=${loc}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  const clearFilters = () => {
      setSearchTerm(""); setLocationFilter("All"); setTypeFilter("All"); setMinPrice(""); setMaxPrice(""); setMinBeds(""); setDateAfter("");
  };

  return (
    <div className="App">
      {/* HEADER: Original Style (Name + Simple Search) */}
      <header className="app-header">
        <div className="header-content">
          <h1>🏡 Estate Agent App</h1>
          
          {!selectedProperty && (
            <div className="search-container">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search properties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="filter-select"
                value={locationFilter} 
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {uniqueLocations.map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>

      <main>
        {selectedProperty ? (
          <PropertyDetails property={selectedProperty} onBack={() => setSelectedProperty(null)} addToFavorites={addToFavorites} allProperties={propertiesData} />
        ) : (
          <>
            {/* ADVANCED SEARCH PANEL (Moved to Main Body) */}
            <div className="advanced-search-panel" style={{ background: '#ecf0f1', padding: '20px', borderRadius: '8px', margin: '0 auto 30px auto', maxWidth: '1000px', border: '1px solid #bdc3c7' }}>
                <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔍 Advanced Filter</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                    
                    <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ flex: 1 }}>
                        <option value="All">All Types</option>
                        {uniqueTypes.filter(t=>t!=="All").map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>

                    <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="search-input" style={{ width: '120px' }} />
                    <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="search-input" style={{ width: '120px' }} />
                    <input type="number" placeholder="Min Beds" value={minBeds} onChange={(e) => setMinBeds(e.target.value)} className="search-input" style={{ width: '100px' }} />
                    <input type="number" placeholder="Year (e.g. 2023)" value={dateAfter} onChange={(e) => setDateAfter(e.target.value)} className="search-input" style={{ width: '140px' }} />
                    
                    <button onClick={clearFilters} style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Clear All ❌</button>
                </div>
            </div>

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div style={{ padding: '20px', background: '#e0f7fa', marginBottom: '30px', borderRadius: '10px', border: '1px solid #b2ebf2' }}>
                <h3 style={{ margin: '0 0 15px 0', textAlign: 'center', color: '#006064' }}>❤️ Your Favorites</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                  {favorites.map((fav) => (
                    <div key={fav.id} style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: 'white', borderRadius: '5px', width: '200px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <img src={fav.image} alt={fav.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '5px' }} />
                      <h4 style={{ fontSize: '16px', margin: '10px 0' }}>{fav.title}</h4>
                      <button onClick={() => removeFromFavorites(fav.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}>Remove ❌</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
              {filteredProperties.length > 0 ? `Latest Properties (${filteredProperties.length})` : "No properties found"}
            </h2>
            
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  addToFavorites={addToFavorites}
                  onView={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="app-footer">
        {/* Footer content same as before */}
        <div className="footer-content">
          <div className="footer-left">
            <h3>Quick Links</h3>
            <ul><li>Home</li><li>Services</li><li>Contact Support</li></ul>
          </div>
          <div className="footer-right">
             <iframe title="Footer Map" width="100%" height="200" src={getMapSrc(locationFilter)} style={{ border: 0 }} allowFullScreen></iframe>
          </div>
        </div>
        <div className="ticker-wrap">
            <div className="ticker"><span className="ticker-item">🌟 Sri Lanka's Best Real Estate Platform 🌟</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;