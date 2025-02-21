import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("{\"data\": [\"A\", \"C\", \"z\"]}");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:5000/bfhl", parsedInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error("API request failed:", err);
      setError("Invalid JSON format or API request failed");
    }
  };

  const handleSelection = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Bajaj Finserv Health Dev Challenge</h2>
      
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}>
        Submit
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <h3>Filter Results:</h3>
          {["alphabets", "numbers", "highest_alphabet"].map((key) => (
            <label key={key} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="checkbox"
                onChange={() => handleSelection(key)}
                checked={selectedOptions.includes(key)}
              />
              {key.replace("_", " ").toUpperCase()}
            </label>
          ))}

          <h3>Response:</h3>
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) => selectedOptions.includes(key))
              ),
              null,
              2
            )}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;
