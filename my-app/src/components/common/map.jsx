import React, { useEffect, useState } from 'react';
import * as atlas from 'azure-maps-control';

const Map = ({ address }) => {
    useEffect(() => {
        
        const map = new atlas.Map('map', {
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: import.meta.env.VITE_AZURE_MAPS_API_KEY,
            },
            center: [78.6677428, 22.3511148],
            zoom: 3,
        });
        
        const geocodeAddress = async () => {
            try {
                const searchURL = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${import.meta.env.VITE_AZURE_MAPS_API_KEY}&query=${encodeURIComponent(address)}`;
                const response = await fetch(searchURL);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const point = data.results[0].position;

                    map.setCamera({
                        center: [point.lon, point.lat],
                        zoom: 12,
                    });
                } else {
                    console.error('Address not found:', address);
                }
            } catch (error) {
                console.error('Error geocoding address:', error);
            }
        };

        geocodeAddress('IIIT Surat Campus, Pasodara, Surat, Gujarat');
        
        return () => {
            map.dispose();
        };
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            {/* Map container */}
        </div>
    );
};

export default Map;
