import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import config from '../../config.json';
import {PLACEHOLDERS, EXAMPLE_CITIES} from "../constants/Landing.js";

function Landing() {
    const navigate = useNavigate();
    const accessToken = config.mapboxAccessToken;

    // References to the map and geocoder
    const mapContainerRef = useRef(null);
    const geocoderContainerRef = useRef(null);

    const mapRef = useRef(null);
    const geocoderRef = useRef(null);

    const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
    const [suggestions, setSuggestions] = useState([]);
    const [isMenuExpanded, setIsMenuExpanded] = useState(true);

    let animationId = null;

    mapboxgl.accessToken = accessToken;

    // Initialize the map and geocoder when the component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [0, 0],
            zoom: 2,
            attributionControl: false
        });

        map.addControl(new mapboxgl.AttributionControl({ compact: true }));

        map.on('load', () => {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder: placeholder,
                marker: {
                    color: "black",
                },
                types: 'country,region,place'
            });

            geocoderContainerRef.current.appendChild(geocoder.onAdd(map));

            const inputElement = geocoderContainerRef.current.querySelector('.mapboxgl-ctrl-geocoder input[type="text"]');
            inputElement.addEventListener('input', (e) => {
                const value = e.target.value;

                if (value.length < 2) {
                    setSuggestions([]);
                }
            });

            geocoder.on('results', (e) => {
                setSuggestions([]);
                const features = e.features;
                if (features && features.length > 0) {
                    const newSuggestions = features.map((feature) => feature.place_name);
                    setSuggestions(newSuggestions);
                }
            });

            geocoder.on('result', () => {
                cancelAnimationFrame(animationId);
            });

            geocoderRef.current = geocoder;
        });

        mapRef.current = map;

        const move = () => {
            const currentCenter = map.getCenter();
            const newCenter = {
                lng: (currentCenter.lng + 0.03) % 360,
                lat: currentCenter.lat,
            };
            map.setCenter(newCenter);
            animationId = requestAnimationFrame(move);
        };

        map.on('load', () => {
            animationId = requestAnimationFrame(move);
        });

        return () => {
            map.remove();
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    // Change the placeholder text every 2 seconds
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % PLACEHOLDERS.length;
            geocoderRef.current._inputEl.placeholder = PLACEHOLDERS[index];
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCityClick = async (city) => {
        const result = await geocoderRef.current.query(city);
        if (result && result.results && result.results.features && result.results.features[0]) {
            const { center } = result.results.features[0];
            mapRef.current.flyTo({ center, zoom: 10 });
        }

        setSuggestions([]);
    };

    // Render the example cities menu
    const ExampleCities = () => {
        return (
            <>
                <div className="city-list-button" onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
                    <span className={isMenuExpanded ? 'chevron up' : 'chevron down'}>&gt;</span> Example Cities
                </div>
                <ul className={`city-list ${isMenuExpanded ? 'expanded' : 'collapsed'}`}>
                    {EXAMPLE_CITIES.map((city) => (
                        <li key={city} onClick={() => handleCityClick(city)}>
                            {city}
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    // Render the suggestions menu
    const Suggestions = () => {
        return (
            <>
                <div className="suggestion-list">
                    {suggestions.map((suggestion) => (
                        <div key={suggestion} className="suggestion" onClick={() => handleCityClick(suggestion)}>
                            {suggestion}
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <>
            <div ref={mapContainerRef} />

            <div className="geocoder-parent">
                <div ref={geocoderContainerRef} />
                <Suggestions />
                <div className="separator" />
                <ExampleCities />
            </div>
        </>
    );

}

export default Landing;
