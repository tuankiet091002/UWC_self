import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { Icons } from '../../icon';
import { mylocation } from './MapEntity';
function GetLocation() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        dblclick() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={mylocation}>
            <Popup>You are here</Popup>
        </Marker>
       
    )
}
export default GetLocation;