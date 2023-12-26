import React, { useState, useEffect } from "react";

function Cards({ onAddClick }) {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [error, setError] = useState(null);
  const [viewingDetails, setViewingDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMongoData = async () => {
      try {
        const response = await fetch("https://foodcounter-backend.onrender.com/api/foods");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const data = await response.json();
        console.log("Fetched data from server:", data);
        setFoods(data);
        setFilteredFoods(data); // Set filtered foods initially to all foods
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMongoData();
  }, []);

  const handleViewDetails = (foodId) => {
    setViewingDetails(foodId);
  };

  const handleClose = () => {
    setViewingDetails(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter foods based on the search query
    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(query)
    );
    setFilteredFoods(filtered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" container m-auto mb-3">
      <div className="row m-auto d-flex p-1 justify-content-center p-0">
        <div className="col-6"><input
          class="form-control me-2 p-2"
          type="search"
          placeholder="Search Food"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearch}
        /></div>
        
      </div>
      <div
        className="container-fluid p-0"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredFoods.map((food) => (
          <div
            className="card m-auto mt-2 border-2 border-dark"
            style={{ width: "18rem" }}
            key={food._id}
          >
            <img
              src={food.image}
              alt={food.name}
              className="card-img-top m-auto  p-2 img-thumbnail"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "10px",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{food.name}</h5>
              <p className="card-text">calories: {food.calories}</p>
              <div className="row">
                <div className="d-grid gap-2 col-6 m-auto">
                  <button
                    className="btn btn-outline-dark btn-lg"
                    onClick={() => handleViewDetails(food._id)}
                  >
                    View
                  </button>
                </div>
                <div className="d-grid gap-2 col-6 m-auto">
                  <button
                    className="btn btn-outline-dark btn-lg"
                    onClick={() => onAddClick(food)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying details */}
      <div
        className="modal"
        tabIndex="-1"
        style={{ display: viewingDetails !== null ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Food Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {viewingDetails !== null && (
                <div>
                  {/* Display additional details here */}
                  <img
                    src={
                      foods.find((item) => item._id === viewingDetails)?.image
                    }
                    alt={
                      foods.find((item) => item._id === viewingDetails)?.name
                    }
                    className="card-img-top m-auto  p-2 img-thumbnail"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "10px",
                    }}
                  />
                  <h5>
                    Name:{" "}
                    {foods.find((item) => item._id === viewingDetails)?.name}
                  </h5>
                  <p>
                    Calories:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.calories
                    }
                  </p>
                  <p>
                    total fat:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.fat_total_g
                    }
                  </p>
                  <p>
                    Carbohydrates:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.carbohydrates_total_g
                    }
                  </p>
                  <p>
                    sodium:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.sodium_mg
                    }
                  </p>
                  <p>
                    Protien:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.protein_g
                    }
                  </p>
                  <p>
                    potassium:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.potassium_mg
                    }
                  </p>
                  <p>
                    cholesterol:{" "}
                    {
                      foods.find((item) => item._id === viewingDetails)
                        ?.cholesterol_mg
                    }
                  </p>
                  <p>
                    Fiber:{" "}
                    {foods.find((item) => item._id === viewingDetails)?.fiber_g}
                  </p>
                  <p>
                    sugar:{" "}
                    {foods.find((item) => item._id === viewingDetails)?.sugar_g}
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
////

export default Cards;
