import React, { useState, useContext } from "react";
import { useAuth } from '../../contexts/AuthContext'; 
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import './PostRideForm.scss';
const PostRideForm = () => {
  const { currentUser } =  useAuth(); // Access the current user from context
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [activeField, setActiveField] = useState("");

  const fetchSuggestions = async (input, field) => {
    if (!input) {
      field === "from" ? setSuggestionsFrom([]) : setSuggestionsTo([]);
      return;
    }

    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=pk.d982cf7c60dc4d7724b76fc07fc0cd49&q=${input}, Canada&format=json&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredData = data.filter((place) => place.address.country === "Canada");

      if (field === "from") {
        setSuggestionsFrom(filteredData.map((place) => truncateSuggestion(place.display_name)));
      } else {
        setSuggestionsTo(filteredData.map((place) => truncateSuggestion(place.display_name)));
      }
      setActiveField(field);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSuggestionsFrom([]);
      setSuggestionsTo([]);
    }
  };

  const truncateSuggestion = (suggestion) => {
    const maxLength = 30;
    return suggestion.length > maxLength ? suggestion.substring(0, maxLength) + "..." : suggestion;
  };

  const handleSelectSuggestion = (value, field) => {
    if (field === "from") {
      setFrom(value);
      setSuggestionsFrom([]);
    } else {
      setTo(value);
      setSuggestionsTo([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!currentUser) {
      alert("You need to be logged in to post a ride.");
      return;
    }
    console.log("Current User:", currentUser);
    const rideData = {
      from,
      to,
      date,
      time,
      price: parseFloat(price),
      seats: parseInt(seats, 5),
      is_booked: false, // Default value
      booked_seats: null, // Default value
      driver_id: currentUser.user_id // Get the current driver's ID
    };
    console.log("Ride Data to be submitted:", rideData);
    try {
      const response = await fetch("http://localhost:8080/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        alert("Ride details submitted successfully!");
        // Optionally, you can reset the form fields after successful submission
        setFrom("");
        setTo("");
        setDate("");
        setTime("");
        setPrice("");
        setSeats("");
      } else {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        alert("Error submitting ride details: " + errorData.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div > 
      <Header/>
      <h2 className="post-ride__title">Post a Ride</h2>
      <form onSubmit={handleSubmit} className="post-ride" >
      
        <label className="post-ride__label">From:</label>
        <input
          type="text"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            fetchSuggestions(e.target.value, "from");
          }}
          className="post-ride__input"
          placeholder="Enter starting location"
          required
        />
        {suggestionsFrom.length > 0 && (
          <ul >
            {suggestionsFrom.map((suggestion, index) => (
              <li
                key={index}
               
                onClick={() => handleSelectSuggestion(suggestion, "from")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        {/* To Location */}
        <label className="post-ride__label">To:</label>
        <input
          type="text"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            fetchSuggestions(e.target.value, "to");
          }}
           className="post-ride__input"
          placeholder="Enter destination"
          required
        />
        {suggestionsTo.length > 0 && (
          <ul>
            {suggestionsTo.map((suggestion, index) => (
              <li
                key={index}
                
                onClick={() => handleSelectSuggestion(suggestion, "to")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        {/* Date Picker */}
        <label className="post-ride__label">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}  required  className="post-ride__input" />

        {/* Time Picker */}
        <label className="post-ride__label">Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)}  required  className="post-ride__input" />

        {/* Price */}
        <label className="post-ride__label">Price ($):</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  required  className="post-ride__input" />

        {/* Available Seats */}
        <label className="post-ride__label">Available Seats:</label>
        <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)}   required className="post-ride__input" />

        {/* Submit Button */}
        <button type="submit" className="post-ride__btn">
        Post Ride
        </button>
        <Link to="/MainPage"><button type="button" className="post-ride__btn post-ride__btn-Back ">Back</button></Link>
      </form>
     
    </div>
  );
};

export default PostRideForm;
