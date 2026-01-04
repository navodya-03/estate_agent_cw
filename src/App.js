import React, { useState } from 'react';
import './App.css';
import { PropertyCard } from './propertyCard';
import propertiesData from './properties.json';

// --- MENNA ALUTH KOTASA: DETAILED VIEW COMPONENT (Slider & Form) ---
// මේකෙන් තමයි අර විස්තර පෙන්නන පිටුව හැදෙන්නේ
function PropertyDetails({ property, onBack, addToFavorites, allProperties }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Slide Show logic
  const otherImages = allProperties.filter(p => p.id !== property.id).map(p => p.image).slice(0, 5);
  const images = [property.image, ...otherImages];

  const nextImage = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const getMapSrc = (location) => {
    return `https://maps.google.com/maps?q=$${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer', background: '#555', color: 'white', border: 'none' }}>
        ⬅ Back
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {/* Left: Image Slider */}
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '10px' }}>
            <img src={images[currentImage]} alt="Slide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={prevImage} style={{ position: 'absolute', left: 0, top: '50%', fontSize: '30px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>❮</button>
            <button onClick={nextImage} style={{ position: 'absolute', right: 0, top: '50%', fontSize: '30px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>❯</button>
          </div>
          <h1>{property.title}</h1>
          <h2 style={{ color: '#007bff' }}>{property.price}</h2>
          <p>{property.description}</p>
          <button onClick={() => addToFavorites(property)} style={{ padding: '10px 20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add to Favorites ❤️
          </button>
        </div>

        {/* Right: Form & Map */}
        <div style={{ flex: '1 1 300px' }}>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '20px' }}>
                <h3>Request Info</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Sent!"); }}>
                    <input type="text" placeholder="Name" required style={{ display: 'block', width: '90%', padding: '10px', marginBottom: '10px' }} />
                    <input type="email" placeholder="Email" required style={{ display: 'block', width: '90%', padding: '10px', marginBottom: '10px' }} />
                    <textarea placeholder="Message" style={{ display: 'block', width: '90%', padding: '10px', marginBottom: '10px' }}></textarea>
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>Send</button>
                </form>
            </div>
            <iframe width="100%" height="250" src={getMapSrc(property.location)} style={{ border: 0 }}></iframe>
        </div>
      </div>
    </div>
  );
}
// --- ALUTH KOTASA Iwarai ---


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  // --- MENNA ALUTH KOTASA (State) ---
  const [selectedProperty, setSelectedProperty] = useState(null); 
  // ----------------------------------

  const uniqueLocations = ["All", ...new Set(propertiesData.map(item => item.location))];

  const filteredProperties = propertiesData.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "All" || property.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const addToFavorites = (property) => {
    if(!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    } else {
      alert("Already in favorites!");
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const getMapSrc = (location) => {
    const loc = location === "All" ? "Sri Lanka" : location;
    return `https://maps.google.com/maps?q=$${loc}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="App">
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Estate Agent App</h1>
      </header>

      <main style={{ padding: '20px' }}>
        
        {/* --- MENNA ALUTH KOTASA (Conditional Rendering) --- */}
        {/* selectedProperty එකක් තියෙනවා නම් විස්තර පෙන්වන්න, නැත්නම් පරණ ලිස්ට් එක පෙන්වන්න */}
        
        {selectedProperty ? (
          <PropertyDetails 
            property={selectedProperty} 
            onBack={() => setSelectedProperty(null)} // Back යන්න
            addToFavorites={addToFavorites}
            allProperties={propertiesData}
          />
        ) : (
          <>
             {/* --- පරණ DASHBOARD එක මෙතන තියෙන්නේ --- */}
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px', width: '300px' }} />
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} style={{ padding: '10px' }}>
                {uniqueLocations.map((loc, index) => <option key={index} value={loc}>{loc}</option>)}
              </select>
            </div>

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div style={{ padding: '20px', backgroundColor: '#e0f7fa', marginBottom: '30px', borderRadius: '10px' }}>
                <h2 style={{ textAlign: 'center' }}>❤️ Favorites ({favorites.length})</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                  {favorites.map((fav) => (
                    <div key={fav.id} style={{ border: '1px solid #ccc', padding: '10px', background: 'white', width: '200px' }}>
                      <img src={fav.image} alt={fav.title} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                      <h4>{fav.title}</h4>
                      <button onClick={() => removeFromFavorites(fav.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px' }}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Map */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
               <h3>📍 Map: {locationFilter}</h3>
               <iframe width="100%" height="300" src={getMapSrc(locationFilter)} style={{ border: 0 }}></iframe>
            </div>

            {/* Property List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  addToFavorites={addToFavorites}
                  // --- MENNA ALUTH KOTASA: View Button එක connect කිරීම ---
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