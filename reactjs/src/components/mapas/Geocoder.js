import React, { useState } from 'react';
import mapboxSdk from '@mapbox/mapbox-sdk';
import mapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mapboxGeocoding(mapboxSdk({ accessToken: 'pk.eyJ1IjoibWFydGExMjM0NSIsImEiOiJjbGlqNmcyZjMwNTl1M3BvNXAxdHViZ2RsIn0.bB3QeJthYJFxIgnlDbkoAw' }));

const Geocoder = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await geocodingClient.forwardGeocode({
        query,
        types: ['place'],
      }).send();

      if (response.body && response.body.features && response.body.features.length > 0) {
        setSuggestions(response.body.features);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleLocationSelect = (location) => {
    setQuery(location.place_name);
    onLocationSelect(location);
    setSuggestions([]);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleLocationSelect({
              place_name: suggestion.place_name,
              latitude: suggestion.center[1],
              longitude: suggestion.center[0],
            })}>
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}

      <button type="button" onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default Geocoder;
