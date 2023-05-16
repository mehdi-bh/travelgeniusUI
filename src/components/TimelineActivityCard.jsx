import '../styles/TimelineActivityCard.css'
import TimelineIndicator from "./TimelineIndicator.jsx";
const TimelineActivityCard = ({ type, imgSrc, title, description, startTime, endTime }) => (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
        <TimelineIndicator startTime={startTime} endTime={endTime}/>
        <div className="w-full h-48 md:w-48 md:h-48 overflow-hidden relative flex-shrink-0">
            <img className="min-w-full min-h-full absolute top-0 left-0 object-cover object-center" src={imgSrc} alt={title} />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

export default TimelineActivityCard;