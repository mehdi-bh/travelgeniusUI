import { useLocation } from 'react-router-dom';
import SideMap from "../components/SideMap.jsx";
import TimelineActivityCard from "../components/TimelineActivityCard.jsx";
import * as TimelineCardTypes from "../constants/TimelineCardTypes.js";
import TimelineTransportCard from "../components/TimelineTransportCard.jsx";
import {useState} from "react";

function Trip() {
    const location = useLocation();
    const {selectedPlace, selectedPlaceCoordinates, adults, kids, startDate, endDate} = location.state;
    const [hoveredCard, setHoveredCard] = useState(null);

    const timelineData = [
        { id: "1", title: "CN Tower", coordinates: [-73.935242, 40.740610], imgSrc: 'https://s3.amazonaws.com/crowdriff-media/full/2a93101a919000f5478a0f1d162886f752139642b0fd5b47c9905713f7ba5efc.jpg', description: 'What a big tower wow', rating: 4.7, neighborhood: "Spadina", startTime: '11:00', endTime: '12:00', type: 'activity', details: "fdp" },
        {
            type: 'transport',
            propositions: [
                { transportType: 'car', startTime: '14:00', endTime: '14:30', duration: '30 min' },
                { transportType: 'bus', startTime: '14:00', endTime: '14:30', duration: '30 min' },
                { transportType: 'walk', startTime: '14:00', endTime: '14:30', duration: '30 min' },
            ]
        },
        { id: "2", title: "Ripley's Aquarium of Canada", coordinates: [-73.935242, 40.720610], imgSrc: 'https://app.rciis.ca/staff/docs/student-activities/Media%20-%2059%202023-03-02%20at%204.58.57%20PM.jpg', description: "Ripley's Aquarium is one of the largest indoor aquariums in North America.", rating: 4.2, neighborhood: "Little Italy", startTime: '13:00', endTime: '14:00', type: 'activity', details: "fdp" },
        {
            type: 'transport',
            propositions: [
                { transportType: 'car', startTime: '14:00', endTime: '14:30', duration: '30 min' },
                { transportType: 'bus', startTime: '14:00', endTime: '14:30', duration: '30 min' },
                { transportType: 'walk', startTime: '14:00', endTime: '14:30', duration: '30 min' },
            ]
        },
        { id: "3", title: "CN Tower", coordinates: [-73.935242, 40.730610], imgSrc: 'https://s3.amazonaws.com/crowdriff-media/full/2a93101a919000f5478a0f1d162886f752139642b0fd5b47c9905713f7ba5efc.jpg', description: 'What a big tower wow', rating: 4.7, neighborhood: "Spadina", startTime: '11:00', endTime: '12:00', type: 'activity', details: "fdp" },
    ];

    const places = timelineData.filter((item) => item.type === TimelineCardTypes.ACTIVITY);

    return (
        <>
            <div className="trip-container overflow-auto flex h-screen" >
                <div className="trip-details w-1/2 overflow-auto p-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className={"text-2xl font-extrabold p-1"}>Toronto</span>
                            <span className="badge bg-gray-200 text-gray-800 text-lg font-medium px-3 py-0.5 rounded-full ml-2">{"11 may"}</span>
                        </div>
                        <div>
                            <button type="button"
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit trip
                            </button>
                            <button type="button"
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Export
                            </button>
                        </div>
                    </div>

                    <div className="timeline mt-2">
                        {
                            timelineData.map((item) => {
                                if (item.type === TimelineCardTypes.ACTIVITY) {
                                    return (
                                        <TimelineActivityCard
                                            {...item}
                                            onMouseEnter={() => setHoveredCard(item.id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        />
                                    );
                                }
                                else if (item.type === TimelineCardTypes.TRANSPORT) {
                                    return (<TimelineTransportCard {...item} />);
                                }
                            })
                        }
                    </div>

                    <div className={"mt-52"}>
                        <h2 className={"font-bold underline"}>Your Trip to {selectedPlace}</h2>
                        <p>Adults: {adults}</p>
                        <p>Kids: {kids}</p>
                        <p>Start Date: {startDate}</p>
                        <p>End Date: {endDate}</p>
                    </div>
                </div>
                <div className="trip-map w-1/2 h-full">
                    <SideMap places={places} center={selectedPlaceCoordinates} hoveredCard={hoveredCard} className="w-full h-full" />
                </div>
            </div>
        </>

    );
}

export default Trip;
