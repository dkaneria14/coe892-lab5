function handleFormSubmit(event, endpoint) {
  event.preventDefault();
  let method = document.getElementById(`method-${endpoint}`).value;
  let params = document.getElementById(`params-${endpoint}`).value;

  let idMines = document.getElementById("id-mines").value;
  let idRovers = document.getElementById("id-rovers").value;

  let urlMines = idMines
    ? `http://localhost:8000/${endpoint}/${idMines}?${params}`
    : `http://localhost:8000/${endpoint}?${params}`;

  let urlRovers = idRovers
    ? `http://localhost:8000/${endpoint}/${idRovers}?${params}`
    : `http://localhost:8000/${endpoint}?${params}`;

  let urlMap = params
    ? `http://localhost:8000/${endpoint}?${params}`
    : `http://localhost:8000/${endpoint}`;

  let url;
  switch (endpoint) {
    case "map":
      url = urlMap;
      break;
    case "mines":
      url = urlMines;
      break;
    case "rovers":
      url = urlRovers;
      break;
  }

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" ? null : JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`response-${endpoint}`).innerText =
        JSON.stringify(data, null, 2);
      endpoint === "map" && displayMatrix(data);
      if (endpoint === "rovers" && idRovers.includes("dispatch")) {
        displayMatrixRover(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document
  .getElementById("map-form")
  .addEventListener("submit", function (event) {
    handleFormSubmit(event, "map");
  });

document
  .getElementById("mines-form")
  .addEventListener("submit", function (event) {
    handleFormSubmit(event, "mines");
  });

document
  .getElementById("rovers-form")
  .addEventListener("submit", function (event) {
    handleFormSubmit(event, "rovers");
  });

function displayMatrix(data) {
  var matrixDiv = document.getElementById("matrix");
  matrixDiv.innerHTML = "";
  data.forEach((row) => {
    var rowDiv = document.createElement("div");
    rowDiv.className = "row";
    row.forEach((cell) => {
      var squareDiv = document.createElement("div");
      squareDiv.className = "square " + (cell === "1" ? "one" : "zero");
      rowDiv.appendChild(squareDiv);
    });
    matrixDiv.appendChild(rowDiv);
  });
}

function displayMatrixRover(data) {
  var matrixDiv = document.getElementById("matrix-rover");
  matrixDiv.innerHTML = "";
  data.forEach((row) => {
    var rowDiv = document.createElement("div");
    rowDiv.className = "row";
    row.forEach((cell) => {
      var squareDiv = document.createElement("div");
      var className = null;
      switch (cell) {
        case "1":
          className = "one";
          break;
        case "0":
          className = "zero";
          break;
        case "*":
          className = "path";
          break;
        case "#":
          className = "disarm";
          break;
        case "x":
          className = "death";
          break;
        default:
          console.log("invalid value"); // Handle unexpected values
      }
      squareDiv.className = "square " + className;
      rowDiv.appendChild(squareDiv);
    });
    matrixDiv.appendChild(rowDiv);
  });
}
