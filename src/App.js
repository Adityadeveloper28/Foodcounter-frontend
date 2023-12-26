import logo from "./logo.svg";
import "./App.css";
import html2pdf from "html2pdf.js";

import Nav from "./components/Nav";
import Cards from "./components/Cards";
import Add from "./components/Add";
import React, { useState } from "react";

function App() {
  const [addedDetails, setAddedDetails] = useState([]);
  //
  const handlePrintAddComponent = () => {
    const addComponent = document.getElementById("add-component");

    if (addComponent) {
      html2pdf(addComponent);
    }
  };
  //
  const handleAddClick = (food) => {
    setAddedDetails((prevDetails) => [...prevDetails, food]);
  };
  return (
    <div className="container-fluid p-0">
      <div className="container-fluid m-0 p-0">
        <Nav />
      </div>
      <div className="d-grid gap-2 col-6 mx-auto p-3">
        <button
          className="btn btn-outline-dark btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Added details
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Added details{" "}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div id="add-component">
                <Add addedDetails={addedDetails} />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handlePrintAddComponent}
                >
                  print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0">
        <Cards onAddClick={handleAddClick} />
      </div>
    </div>
  );
}

export default App;
