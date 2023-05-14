import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

function Landing() {
    const navigate = useNavigate();

    const accessToken = "pk.eyJ1IjoibWVoZGliaCIsImEiOiJjbGhsdmd1ajUwNndrM2ptbmN0amlhOG8yIn0.0amrf-21qnzlUSF7K41G6w";

    const placeholders = ['Try: New York City', 'Try: Brussels, Belgium', 'Try: Los Angeles, USA'];
    const [placeholder, setPlaceholder] = useState(placeholders[0]);

    const [citySelected, setCitySelected] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const exampleCities = ['New York City, United States', 'Los Angeles, United States', 'Brussels, Belgium'];
    const [isMenuExpanded, setIsMenuExpanded] = useState(true);

    const mapContainerRef = useRef(null);
    const geocoderContainerRef = useRef(null);

    const mapRef = useRef(null);
    const geocoderRef = useRef(null);

    let animationId = null;

    mapboxgl.accessToken = accessToken;

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

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % placeholders.length;
            geocoderRef.current._inputEl.placeholder = placeholders[index];
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCityClick = async (city) => {
        const result = await geocoderRef.current.query(city);
        if (result && result.results && result.results.features && result.results.features[0]) {
            const { center } = result.results.features[0];
            mapRef.current.flyTo({ center, zoom: 10 });
        }

        setCitySelected(true);
        setSuggestions([]);
    };

    return (
        <>
            <div ref={mapContainerRef} />
            <div className="geocoder-parent">
                <div ref={geocoderContainerRef} />
                <div className="suggestion-list">
                    {suggestions.map((suggestion) => (
                        <div key={suggestion} className="suggestion" onClick={() => handleCityClick(suggestion)}>
                            {suggestion}
                        </div>
                    ))}
                </div>
                <div className="separator" />
                <div className="city-list-button" onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
                    <span className={isMenuExpanded ? 'chevron up' : 'chevron down'}>&gt;</span> Example Cities
                </div>
                <ul className={`city-list ${isMenuExpanded ? 'expanded' : 'collapsed'}`}>
                    {exampleCities.map((city) => (
                        <li key={city} onClick={() => handleCityClick(city)}>
                            {city}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

}

export default Landing;
