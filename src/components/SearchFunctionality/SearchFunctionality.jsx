import React, { useState , useEffect } from "react";
import './SearchFunctionality.scss';
import CardDetails from "../CardDetails/CardDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LocationSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [rides, setRides] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {
    // Load all rides on first render
    fetchAllRides();
}, []);

const fetchAllRides = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/rides");
      setRides(response.data);
    } catch (error) {
      console.error("Error fetching rides:", error);
      setError("Failed to load rides.");
    } finally {
      setLoading(false);
    }
  };


  const fetchSuggestions = async (input, field) => {
    if (!input) {
      field === "from" ? setSuggestionsFrom([]) : setSuggestionsTo([]);
      return;
    }

    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=pk.d982cf7c60dc4d7724b76fc07fc0cd49&q=${input}, Canada&format=json&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Filter suggestions for Canadian addresses only
      const filteredData = data.filter((place) =>
        place.address.country === "Canada"
      );

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
    const maxLength = 30; // Set your desired max length here
    return suggestion.length > maxLength ? suggestion.substring(0, maxLength) + "..." : suggestion;
  };

  const handleSelectSuggestion = (value) => {
    if (activeField === "from") {
      setFrom(value);
      setSuggestionsFrom([]); // Clear suggestions after selection
    } else if (activeField === "to") {
      setTo(value);
      setSuggestionsTo([]); // Clear suggestions after selection
    }
  };
  const handleSearchRides = async () => {
    if (!from || !to) {
      setError("Please enter both locations.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8080/rides/search?from=${from}&to=${to}`);
      setRides(response.data);
    } catch (error) {
      console.error("Error fetching ride details:", error);
      setError("No rides found for the selected locations.");
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const handlePostRide = () => {
    navigate("/post-ride");
  };

  return (
    <div className="search-box">
      <label className="search-box__label">From</label>
      <input
      className="search-box__input"
        type="text"
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
          fetchSuggestions(e.target.value, "from");
        }}
       
        placeholder="Enter starting location"
      />

      {suggestionsFrom.length > 0 && (
        <ul >
          {suggestionsFrom.map((suggestion, index) => (
            <li
              key={index}
              
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <label className="search-box__label" >To</label>
      <input
       className="search-box__input"
        type="text"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
          fetchSuggestions(e.target.value, "to");
        }}
       
        placeholder="Enter destination"
      />

      {suggestionsTo.length > 0 && (
        <ul >
          {suggestionsTo.map((suggestion, index) => (
            <li
              key={index}
             
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="search-box__btn search-box__btn-search__ride"  onClick={handleSearchRides}>Search for Ride</button>
      {error && <p className="error-message">{error}</p>}
      <button type="button" className="search-box__btn" onClick={fetchAllRides}>
      Show All Rides
    </button>
    <button type="button" onClick={handlePostRide} className="post-ride-button search-box__btn">Post for Ride</button>
    {!loading && rides.length === 0 && <p>No rides found for the selected locations.</p>}
      <CardDetails  rides={rides} loading={loading}/>
    </div>
  );
};

export default LocationSearch;
