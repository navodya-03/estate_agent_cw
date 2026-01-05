import React, { useState } from 'react';
import './App.css';
import { PropertyCard } from './propertyCard';
import propertiesData from './properties.json';

// --- 1. DETAILED VIEW COMPONENT (Slideshow & Form) ---
function PropertyDetails({ property, onBack, addToFavorites, allProperties }) {
  const [currentImage, setCurrentImage] = useState(0);

  // --- IMAGE LOGIC (UPDATED) ---
  // 1. JSON eke 'images' list ekak thiyenawada balanawa.
  // 2. Nathnam, anith gewal wala photos aran slide show eka hadanawa (Auto).
  const otherImagesFallback = allProperties
    .filter(p => p.id !== property.id)
    .map(p => p.image)
    .slice(0, 5);

  const images = (property.images && property.images.length > 0) 
    ? property.images 
    : [property.image, ...otherImagesFallback];
  // -----------------------------

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Request Sent Successfully! We will contact you.");
  };

  const getMapSrc = (location) => {
    const loc = location === "All" ? "Sri Lanka" : location;
    return `https://maps.google.com/maps?q=${loc}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px' }}>
        ⬅ Back to Properties
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        
        {/* Left Side: Image Slider */}
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ position: 'relative', height: '400px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            <img 
              src={images[currentImage]} 
              alt="Property Slide" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <button onClick={prevImage} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', fontSize: '20px', borderRadius: '50%' }}>❮</button>
            <button onClick={nextImage} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', fontSize: '20px', borderRadius: '50%' }}>❯</button>
            <p style={{ position: 'absolute', bottom: '10px', right: '20px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '5px' }}>Image {currentImage + 1} of {images.length}</p>
          </div>
          
          <h1 style={{ marginTop: '20px', color: '#282c34' }}>{property.title}</h1>
          <h2 style={{ color: '#007bff' }}>{property.price}</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>{property.description}</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', fontSize: '16px' }}>
             <li>📍 <strong>Location:</strong> {property.location}</li>
             <li>🛏️ <strong>Bedrooms:</strong> {property.bedrooms}</li>
          </ul>

          <button 
            onClick={() => addToFavorites(property)}
            style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
          >
            Add to Favorites ❤️
          </button>
        </div>

        {/* Right Side: Request Form & Map */}
        <div style={{ flex: '1 1 300px' }}>
            <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0, color: '#282c34' }}>📬 Request More Info</h3>
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="text" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Your Name" />
                    <input type="email" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Email Address" />
                    <textarea rows="4" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Message..."></textarea>
                    <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Send Request 🚀
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h4>📍 Location: {property.location}</h4>
              <div style={{ width: '100%', height: '250px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <iframe
                  title="Property Map Detail"
                  width="100%"
                  height="100%"
                  src={getMapSrc(property.location)}
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}

// --- 2. MAIN APP COMPONENT ---
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const uniqueLocations = ["All", ...new Set(propertiesData.map(item => item.location))];

  const filteredProperties = propertiesData.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "All" || property.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
      alert("Added to Favorites! ❤️");
    } else {
      alert("This property is already in your favorites!");
    }
  };

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
  };

  const getMapSrc = (location) => {
    const loc = location === "All" ? "Sri Lanka" : location;
    return `https://maps.google.com/maps?q=${loc}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>🏡 Estate Agent App</h1>
      </header>

      <main style={{ padding: '20px' }}>
        
        {selectedProperty ? (
          
          <PropertyDetails 
            property={selectedProperty} 
            onBack={() => setSelectedProperty(null)}
            addToFavorites={addToFavorites}
            allProperties={propertiesData}
          />

        ) : (
          
          <> 
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Search properties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', width: '300px', fontSize: '16px' }}
              />
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

            <div style={{ marginTop: '20px', marginBottom: '40px', textAlign: 'center' }}>
              <h3>📍 Location Map: {locationFilter === "All" ? "Sri Lanka" : locationFilter}</h3>
              <div style={{ width: '100%', height: '350px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <iframe
                  title="Property Map"
                  width="100%"
                  height="100%"
                  src={getMapSrc(locationFilter)}
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
              {filteredProperties.length > 0 ? "Latest Properties" : "No properties found"}
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
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
    </div>
  );
}

export default App;