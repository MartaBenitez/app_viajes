import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGExMjM0NSIsImEiOiJjbGlqNmcyZjMwNTl1M3BvNXAxdHViZ2RsIn0.bB3QeJthYJFxIgnlDbkoAw'; // Reemplaza con tu propio token de acceso de Mapbox

export default function MapaMarcadores({ listaEventos }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
  
    const filtrado = listaEventos.filter(objeto => (
      typeof objeto.latitud === 'number' && typeof objeto.longitud === 'number'
    ));
  
    const localizaciones = filtrado.map(objeto => ({
      ubicacion: objeto.ubicacion,
      latitude: objeto.latitud,
      longitude: objeto.longitud
    }));
  
    const longitudI = -3.703790;
    const latitudI = 40.416775;
  
    useEffect(() => {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitudI, latitudI],
        zoom: 3,
      });
  
      return () => {
        mapRef.current.remove();
      };
    }, []);
  
    useEffect(() => {
      if (mapRef.current && localizaciones.length > 0) {
        const geojson = {
          type: 'FeatureCollection',
          features: localizaciones.map((punto) => ({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [punto.longitude, punto.latitude],
            },
          })),
        };
  
        if (!mapRef.current.getSource('puntos')) {
          mapRef.current.addSource('puntos', {
            type: 'geojson',
            data: geojson,
          });
        }
  
        if (!mapRef.current.getLayer('puntos-layer')) {
          mapRef.current.addLayer({
            id: 'puntos-layer',
            type: 'circle',
            source: 'puntos',
            paint: {
              'circle-color': '#FF0000',
              'circle-radius': 6,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
            },
          });
        }
      }
    }, [localizaciones]);
  
    return <div className="map-container" ref={mapContainerRef} style={{ width: '500px', height: '300px' }} />;
  }