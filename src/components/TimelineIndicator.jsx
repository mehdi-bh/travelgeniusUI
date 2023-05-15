const TimelineIndicator = ({ startTime, endTime }) => (
    <div className="flex flex-col justify-between p-4 leading-none badge-container">
        <span className="badge bg-gray-200 text-gray-800 text-xs font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{startTime}</span>
        <span className="badge bg-gray-200 text-gray-800 text-xs font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{endTime}</span>
    </div>
);

export default TimelineIndicator;