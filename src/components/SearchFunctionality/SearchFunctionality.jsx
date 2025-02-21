import React, { useState } from "react";
import './SearchFunctionality.scss';
const LocationSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
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

  return (
    <div className="p-4 max-w-md mx-auto">
      <label className="block mb-2 text-lg">From:</label>
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
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <label className="block mt-4 mb-2 text-lg">To:</label>
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
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
