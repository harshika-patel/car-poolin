import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardDetails.scss"; 

const CardDetails = () => {
    const [rides, setRides] = useState([]); // Initialize as an array

    useEffect(() => {
        // Fetch ride details from the backend
        axios.get("http://localhost:8080/rides") // Update API endpoint as needed
            .then(response => {
                setRides(response.data); // Set the rides data
            })
            .catch(error => {
                console.error("Error fetching ride details:", error);
            });
    }, []);

    if (rides.length === 0) return <p>Loading...</p>; // Check for empty array

    return (
        <div className="rides-container">
            {rides.map(ride => (
                <div className="ride-card" key={ride.id}>
                    {/* Header with date and time */}
                    <div className="ride-header">
                        <span className="ride-date">{new Date(ride.date).toLocaleDateString()}</span>
                        <span className="ride-time">{ride.time}</span>
                    </div>

                    {/* Ride details */}
                    <div className="ride-body">
                        {/* Static Profile Image */}
                        <img className="profile-pic" src="/static/profile.png" alt="Profile" />
                        
                        {/* Driver details - assuming these fields exist in your ride data */}
                        <div className="ride-info">
                            <h4>{ride.username || "Driver"}</h4>  {/* Use placeholder if username is not available */}
                            <p>{ride.phone_number || "N/A"}</p>  {/* Use placeholder if phone number is not available */}
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
                        <p>${ride.price} per seat</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardDetails;
