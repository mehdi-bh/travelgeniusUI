import '../styles/TimelineActivityCard.css'
import TimelineIndicator from "./TimelineIndicator.jsx";
import ReactStars from "react-rating-stars-component";
import ActivityDetailsModal from "./ActivityDetailsModal.jsx";

const TimelineActivityCard = ({ id, type, imgSrc, title, description, startTime, endTime, rating, neighborhood, details, onMouseEnter, onMouseLeave }) => (
    <>
        <div data-modal-target={id} data-modal-toggle={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="h-48 flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
            <TimelineIndicator startTime={startTime} endTime={endTime}/>

            <div className="h-full w-48 overflow-hidden relative flex-shrink-0">
                <img className="min-w-full min-h-full absolute top-0 left-0 object-cover object-center" src={imgSrc}/>
            </div>

            <div className="flex flex-col p-4 justify-between w-full h-full">
                <div>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <div className="flex items-center">
                        <ReactStars
                            count={5}
                            value={rating}
                            size={12}
                            activeColor="#ffd700"
                        />
                        <p className="text-xs pl-4 pr-2">{rating}</p>
                        <div className="border-r border-gray-400 h-4 mx-2"></div>
                        <p className={"text-xs pl-2"}>{neighborhood}</p>
                    </div>
                    <div className="border-b border-gray-400 mt-2 mb-2"></div>
                    <p className="mb-3 text-xs font-medium dark:text-gray-400">{description}</p>
                </div>

                <div className="flex justify-between">
                    <div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Aquarium / Zoo</span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Family</span>
                    </div>
                    <div>
                        <span className="bg-red-100 text-s font-bold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-red-300">33$ per person</span>
                    </div>
                </div>
            </div>
        </div>

        <ActivityDetailsModal id={id} title={title} details={details}></ActivityDetailsModal>
    </>

);

export default TimelineActivityCard;
