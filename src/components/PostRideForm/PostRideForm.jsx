import React, { useState } from "react";

const PostRideForm = () => {
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
    const rideData = { from, to, date, time, price, seats };

    try {
      const response = await fetch("http://localhost:5000/api/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        alert("Ride details submitted successfully!");
      } else {
        alert("Error submitting ride details.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* From Location */}
        <label className="block">From:</label>
        <input
          type="text"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            fetchSuggestions(e.target.value, "from");
          }}
          className="w-full p-2 border rounded"
          placeholder="Enter starting location"
        />
        {suggestionsFrom.length > 0 && (
          <ul className="border rounded mt-2 bg-white shadow-lg">
            {suggestionsFrom.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectSuggestion(suggestion, "from")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        {/* To Location */}
        <label className="block">To:</label>
        <input
          type="text"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            fetchSuggestions(e.target.value, "to");
          }}
          className="w-full p-2 border rounded"
          placeholder="Enter destination"
        />
        {suggestionsTo.length > 0 && (
          <ul className="border rounded mt-2 bg-white shadow-lg">
            {suggestionsTo.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectSuggestion(suggestion, "to")}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        {/* Date Picker */}
        <label className="block">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />

        {/* Time Picker */}
        <label className="block">Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border rounded" />

        {/* Price */}
        <label className="block">Price ($):</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" />

        {/* Available Seats */}
        <label className="block">Available Seats:</label>
        <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} className="w-full p-2 border rounded" />

        {/* Submit Button */}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostRideForm;
