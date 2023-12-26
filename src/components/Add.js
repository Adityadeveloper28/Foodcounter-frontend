import React, { useEffect, useState } from "react";

function Add({ addedDetails }) {
  const [details, setDetails] = useState(addedDetails);

  useEffect(() => {
    setDetails(addedDetails);
  }, [addedDetails]);

  const handleRemove = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };

  const getTotalCalories = () => {
    return details.reduce((total, detail) => total + detail.calories, 0);
  };

  return (
    <div className="container">
      <h1>FOOD COUNTER</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Action</th>
            {/* Add other fields as needed */}
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>{detail.name}</td>
              <td>{detail.calories}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(index)}
                >
                  X
                </button>
              </td>
              {/* Add other fields as needed */}
            </tr>
          ))}
          <tr>
            <td>Total Calories</td>
            <td>{getTotalCalories()}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Add;
