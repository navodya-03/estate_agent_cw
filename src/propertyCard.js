import React from 'react';

// 👇 onView කියන එක මෙතන අනිවාර්යයෙන්ම තියෙන්න ඕන
export function PropertyCard({ property, addToFavorites, onView }) {
  return (
    <div className="property-card" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px', width: '300px', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      
      <img src={property.image} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover', backgroundColor: '#eee', borderRadius: '5px' }} />
      
      <h3>{property.title}</h3>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p style={{ fontSize: '0.9em', color: '#555' }}>{property.description}</p>
      
      <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => addToFavorites(property)}
          style={{ flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add To Favorites
        </button>

        <button 
          onClick={() => onView(property)}
          style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          View
        </button>
      </div>
      
    </div>
  );
}

