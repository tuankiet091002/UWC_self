import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

function GetLatLng() {
    const [latlng, setLatlng] = useState(null);

    useMapEvents({
        click(e) {
            setLatlng(e.latlng);
        },
    });

    return latlng ? (
        <div
            style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                backgroundColor: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
            }}
        >
            Lat: {latlng.lat}, Lng: {latlng.lng}
        </div>
    ) : null;
}

export default GetLatLng;
