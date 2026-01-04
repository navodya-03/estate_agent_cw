import React from 'react';

export function PropertyCard({ property , addToFavorites }) {
  return (
    <div className="property-card" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px', width: '300px' }}>
      <img src={property.image} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover', backgroundColor: '#eee' }} />
      
      <h3>{property.title}</h3>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p style={{ fontSize: '0.9em', color: '#555' }}>{property.description}</p>

      <button 
        onClick={() => addToFavorites(property)}
        style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}

      >
        Add To Favorites
      </button>
      
    </div>
  );
}

