import React, { useState, useEffect } from 'react';

function DatabaseComponent() {
  const [response, setResponse] = useState([]);
  const [vendor, setVendor] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/get-data")
      .then((res) => res.json())
      .then((data) => {
        // Parse the "json" property as a JSON object
        const innerData = JSON.parse(data[0].json);
        setResponse(innerData);
      });
      fetch("http://localhost:8000/get-vendor-information")
      .then((res) => res.json())
      .then((vendorData) => {
        // Parse the "json" property as a JSON object
        const innerVendor = JSON.parse(vendorData[0].json);
        setVendor(innerVendor);
      });
  }, []);
  console.log(response)
  return (
    <div>
      <h1>SQLite Data</h1>
      <div style={{ backgroundColor: 'white'}}>{JSON.stringify(response, null, 2)}</div>
      <div>__________________________________________</div>
      <div style={{ backgroundColor: 'white'}}>{JSON.stringify(vendor, null, 2)}</div>
    </div>
  );
}

export default DatabaseComponent;