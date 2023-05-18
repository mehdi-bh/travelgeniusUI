import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/Trip.css'
import config from '../../config.json';

function SideMap({ places, center, hoveredCard }) {
    const mapContainerRef = useRef(null);
    const markerRefs = useRef({});
    const mapRef = useRef(null);

    const accessToken = config.mapboxAccessToken;

    mapboxgl.accessToken = accessToken;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: center,
            zoom: 12,
            attributionControl: false
        });

        map.addControl(new mapboxgl.AttributionControl({ compact: true }));
        mapRef.current = map;

        return () => {
            map.remove();
        };
    }, [center]);

    useEffect(() => {
        // Remove old markers if they exist
        for (let id in markerRefs.current) {
            markerRefs.current[id].marker.remove();
        }

        // Clear markerRefs
        markerRefs.current = {};

        for (const place of places) {
            const container = document.createElement('div');
            const el = document.createElement('div');
            el.className = 'custom-marker';

            // Change the style of the marker element
            el.style.width = '50px';
            el.style.height = '35px';
            el.style.backgroundColor = '#FFF';
            el.style.position = 'relative';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';

            // Add the pointer towards the ground using CSS pseudo-elements
            el.style.boxShadow = '0 0 3px rgba(0, 0, 0, 0.2)';
            el.style.borderRadius = '10px';
            el.style.boxSizing = 'border-box';

            // Create a div for the emoji
            el.style.fontSize = '16px';  // Increase the emoji size
            el.innerHTML = '🍕';

            // Add the custom emoji
            container.appendChild(el);

            // Create a new marker with the custom element and add it to the map
            const marker = new mapboxgl.Marker(container)
                .setLngLat(place.coordinates)
                .addTo(mapRef.current);

            // Save the reference to the marker and its element
            markerRefs.current[place.id] = { marker, el };

            // Add mouseenter and mouseleave events to the marker
            container.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.2)';
            });

            container.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });

            // adjust size based on whether this marker's place is the hovered card
            if (place.id === hoveredCard) {
                el.style.transform = 'scale(1.2)';
            } else {
                el.style.transform = 'scale(1)';
            }
        }
    }, [places, hoveredCard]);

    return <div ref={mapContainerRef} />;
}

export default SideMap;
