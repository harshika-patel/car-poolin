import React, { useEffect, useState } from "react";
import axios from "axios";

import profile from "../../assets/image/Profile.png";
import "./CardDetails.scss";
import { useNavigate } from "react-router-dom";
const CardDetails = ({rides=[],loading}) => {
    const [sortedRides, setSortedRides] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const sortedArray = [...rides].sort((a, b) => new Date(b.date) - new Date(a.date));
        setSortedRides(sortedArray);
      }, [rides]);
    if (loading) return <p>Loading rides...</p>;
    return (
        <div className="rides-container">
            {rides.map(ride => (
                <div className="ride-card" key={ride.id}  onClick={() => navigate(`/ride/${ride.id}`)} >
                    {/* Header with Date and Time */}
                    <div className="ride-header">
                        <span className="ride-date">{new Date(ride.date).toLocaleDateString()}</span>
                        <span className="ride-time">{ride.time}</span>
                    </div>

                    {/* Ride details */}
                    <div className="ride-body">
                        {/* Static Profile Image */}
                        <img className="profile-pic" src={profile} alt="Driver Profile" />
                       
                        {/* Driver details */}
                        <div className="ride-info">
                        <h4 className="ride-info__title">{ride.username}</h4> 
                            <p>📞 {ride.phone_number}</p>
                        </div>
                    </div>

                    {/* Location details */}
                    <div className="ride-details">
                        <p><strong>From:</strong> {ride.from}</p>
                        <p><strong>To:</strong> {ride.to}</p>
                    </div>

                    {/* Seats and Price */}
                    <div className="ride-seats">
                        <p>{ride.seats} seats left</p>
                        <p>💰 ${ride.price} per seat</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardDetails;
