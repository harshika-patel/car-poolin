import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import profile from "../../assets/image/Profile.png";
import "./RideDetails.scss";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../Header/Header";
const RideDetails = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seatsNeeded, setSeatsNeeded] = useState(1);
  const [bookingStatus, setBookingStatus] = useState("");
  const { currentUser } = useAuth(); // Get the current user from context
  useEffect(() => {
    axios
      .get(`http://localhost:8080/rides/${id}`)
      .then((response) => {
        setRide(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ride details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    axios
      .post(`http://localhost:8080/rides/${id}/book`, { seatsNeeded })
      .then((response) => {
        setRide((prevRide) => ({
          ...prevRide,
          booked_seats: prevRide.booked_seats + seatsNeeded,
          // seats: prevRide.seats - seatsNeeded,
          is_booked: prevRide.booked_seats + seatsNeeded === prevRide.seats,
        }));
        setBookingStatus("Ride booked successfully!");
      })
      .catch((error) => {
        console.error("Booking error:", error);
        setBookingStatus(error.response?.data?.message || "Error booking ride");
      });
  };

  const handleDelete = () => {
    axios
    .delete(`http://localhost:8080/rides/${id}/cancel`, { data: { seatsToCancel: seatsNeeded } }) 
    .then((response) => {
      setRide((prevRide) => ({
        ...prevRide,
        booked_seats: prevRide.booked_seats - seatsNeeded,
        is_booked: prevRide.booked_seats - seatsNeeded === prevRide.seats,
      }));
      setBookingStatus(response.data.message);
    })
    .catch((error) => {
      console.error("Cancel error:", error);
      setBookingStatus(error.response?.data?.message || "Error canceling ride");
    });
  
};
  if (loading) return <p>Loading...</p>;
  if (!ride) return <p>Ride not found</p>;

  return (
    <div className="ride-detail-container">
      <Header />
      <div className="ride-card">
        <div className="ride-header">
          <span className="ride-date">
            {new Date(ride.date).toLocaleDateString()}
          </span>
          <span className="ride-time">{ride.time}</span>
        </div>

        <div className="ride-body">
          <img className="profile-pic" src={profile} alt="Driver Profile" />
          <div className="ride-info">
            <h4>{ride.username}</h4>
            <p>📞 {ride.phone_number}</p>
          </div>
        </div>

        <div className="ride-details">
          <p>
            <strong>From:</strong> {ride.from}
          </p>
          <p>
            <strong>To:</strong> {ride.to}
          </p>
        </div>

        <div className="ride-seats">
          <p>🎟️ {ride.seats - ride.booked_seats} seats left</p>
          <p>💰 ${ride.price} per seat</p>
        </div>

        {/* Booking Form */}
        {ride.is_booked ? (
          <div className="ride-full">
            <p>🚫 Ride Full</p>

            {/* <button className="cancel-button btn" onClick={handleDelete}>
              Cancel Ride
            </button> */}
          </div>
        ) : (
          <div className="booking-section">
            <label>
              <strong>Total seat Needed</strong>
            </label>
            <select
              value={seatsNeeded}
              onChange={(e) => setSeatsNeeded(parseInt(e.target.value))}
            >
              {ride.seats > ride.booked_seats &&
                [...Array(ride.seats - ride.booked_seats)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>

            <button
              className={`book-button btn ${ride.is_booked ? "disabled" : ""}`}
              onClick={handleBooking}
              disabled={ride.is_booked}
            >
             {ride.booked_seats > 0
              ? `Booked ${ride.booked_seats} ${ride.booked_seats === 1 ? "seat" : "seats"}`
           : "Book Ride"}
            </button>
          </div>
        )}

        {bookingStatus && <p className="booking-status">{bookingStatus}</p>}

        {/* {ride.is_booked && ride.username === currentUser?.username && (
                    <button onClick={handleDelete} className="cancel-button">
                        Cancel Ride
                    </button>
                )} */}

{ride.booked_seats > 0 && (
    <button className="cancel-button btn" onClick={handleDelete}>
        Cancel {seatsNeeded} Seat(s)
    </button>
)}
        <Link to="/MainPage">
          <button type="button" className="book-ride__btn btn">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RideDetails;
