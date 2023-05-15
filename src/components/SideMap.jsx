import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/Trip.css'
import config from '../../config.json';

function SideMap({ center }) {
    const mapContainerRef = useRef(null);
    const accessToken = config.mapboxAccessToken;

    mapboxgl.accessToken = accessToken;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: center,
            zoom: 10,
            attributionControl: false
        });

        map.addControl(new mapboxgl.AttributionControl({ compact: true }));

        return () => {
            map.remove();
        };
    }, [center]);

    return <div ref={mapContainerRef} />;
}

export default SideMap;