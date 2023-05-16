import '../styles/TimelineTransportCard.css'
import TransportSelector from "./TransportSelector.jsx";
const TimelineTransportCard = ({ type, propositions }) => {
    return (
        <div className="flex flex-col time-indicator-transport">
            <div className={"transport-selector"}>
                <TransportSelector/>
            </div>
        </div>
    );
}
export default TimelineTransportCard;