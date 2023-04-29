const firebaseConfig = {
  apiKey: "AIzaSyAzycrrZY9W5Sq820a0ke23YHIPDZhVUms",
  authDomain: "ecohabits-login.firebaseapp.com",
  databaseURL: "https://ecohabits-login-default-rtdb.firebaseio.com",
  projectId: "ecohabits-login",
  storageBucket: "ecohabits-login.appspot.com",
  messagingSenderId: "300618586932",
  appId: "1:300618586932:web:fb5a17e9d6b05468b3a361",
  measurementId: "G-ZSV64JXD9H",
};

const app = firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function () {
    
    const usageData = JSON.parse(localStorage.getItem("usageData"));
    const tableBody = document.getElementById("resultsTableBody");
    let totalCost = 0;
  
    usageData.forEach((data) => {
      const row = document.createElement("tr");
  
      const applianceNameCell = document.createElement("td");
      applianceNameCell.textContent = data.label;
      row.appendChild(applianceNameCell);
  
      const usageCell = document.createElement("td");
      usageCell.textContent = data.kilowatts.toFixed(2);
      row.appendChild(usageCell);
  
      const costCell = document.createElement("td");
      const cost = data.kilowatts * 0.33 * 30; // multiply by 30 for a month
      costCell.textContent = cost.toFixed(2);
      row.appendChild(costCell);
  
      tableBody.appendChild(row);
      totalCost += cost;
    });
  
    const totalKilowatts = usageData.reduce((total, data) => total + data.kilowatts, 0);
    document.getElementById("totalKilowatts").textContent = totalKilowatts.toFixed(2);
    document.getElementById("totalCost").textContent = totalCost.toFixed(2);
    
    createBarGraph(totalCost, parseFloat(localStorage.getItem("price_goal")));
    displayPriceGoalMessage();
});

function displayPriceGoalMessage() {
    const priceGoal = parseFloat(localStorage.getItem("price_goal"));
    const totalCost = parseFloat(document.getElementById("totalCost").textContent);
    const message = generateMessage(totalCost, priceGoal);
    document.getElementById("messageBox").textContent = message;
    const resultImage = document.getElementById("resultImage");
    resultImage.src = totalCost < priceGoal ? "check.png" : "Wrong.png";
}

function generateMessage(totalCost, priceGoal) {
    if (totalCost < priceGoal) {
      return "Congratulations! Your spending is lower than your goal.";
    } else {
      return "Oops! Your spending is higher than your goal.";
    }
}

function createBarGraph(totalCost, priceGoal) {
    const ctx = document.getElementById("totalSpendingChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Total Cost", "Price Goal"],
            datasets: [
              {
                label: "Cost in USD",
                data: [totalCost, priceGoal],
                backgroundColor: [
                  totalCost < priceGoal ? "rgba(75, 192, 192, 0.2)" : "rgba(255, 99, 132, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                  totalCost < priceGoal ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
// Add this function to generate suggestions based on appliance usage
function generateSuggestions() {
    const usageData = JSON.parse(localStorage.getItem("usageData"));
    const averageSpendingPerPerson = {
      Lights: 11.41,
      Fridge: 47.53,
      "Desktop computer": 12.88,
      Stove: 11,
      Microwave: 0.56,
      Heater: 60,
      "Smartphone charger": 0.01,
      "Tablet charger": 0.01,
      TV: 5.24,
      "Electric fan": 2.17,
      "Rice cooker": 6,
      "Air conditioner": 60,
    };
  
    const suggestions = usageData
      .map((data) => {
        const cost = data.kilowatts * 0.33 * 30; // multiply by 30 for a month
        const averageCost = averageSpendingPerPerson[data.label];
        if (cost > averageCost) {
          return `According to the US Department of Energy, your ${data.label} use is higher than the average spending per person in America. Please consider lowering its usage.`;
        } else {
          return "";
        }
      })
      .filter((suggestion) => suggestion !== "");
  
    return suggestions;
  }
  
  // Add this function to show the suggestions in a popup box
  function showSuggestions() {
    const suggestions = generateSuggestions();
    if (suggestions.length === 0) {
      alert("Your appliance usage is within the average range.");
    } else {
      alert(suggestions.join("\n"));
    }
  }
 

  const suggestionButton = document.getElementById("suggestionButton");
  suggestionButton.addEventListener("click", showSuggestions);
  const moreSuggestionsButton = document.getElementById("moreSuggestionsButton");
moreSuggestionsButton.addEventListener("click", function() {
  window.location.href = "suggestions.html";
});


  
  // Add this line at the end of the DOMContentLoaded event listener
  document.getElementById("suggestionButton").addEventListener("click", showSuggestions);
  // Function to save the results to the database
  async function saveResults() {
    const userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      alert("You must be signed in to save results.");
      return;
    }
  
    const usageData = JSON.parse(localStorage.getItem("usageData"));
    const totalKilowatts = usageData.reduce((total, data) => total + data.kilowatts, 0);
    const totalCost = parseFloat(document.getElementById("totalCost").textContent);
  
    const db = firebase.database(app); // Change this line
    const resultsRef = firebase.database().ref(`results/${userEmail.replace(".", ",")}`);
  
    const resultsData = {
      usageData,
      totalKilowatts,
      totalCost,
      timestamp: new Date().toISOString(),
    };
  
    await resultsRef.set(resultsData);
  
    alert("Results saved successfully!");
  }
  

const saveResultsButton = document.getElementById("saveResultsButton");
saveResultsButton.addEventListener("click", saveResults);
const viewHistoryButton = document.getElementById("viewHistoryButton");
viewHistoryButton.addEventListener("click", function() {
  window.location.href = "history.html";
});

const goBackButton = document.getElementById("goBackButton");
goBackButton.addEventListener("click", function () {
  window.location.href = "main.html";
});

