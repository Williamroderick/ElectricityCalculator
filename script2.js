let selectedAppliances;

document.addEventListener("DOMContentLoaded", function () {
  selectedAppliances = JSON.parse(localStorage.getItem("selectedAppliances"));
  const tableBody = document.getElementById("applianceTableBody");

  selectedAppliances.forEach((appliance) => {
    const row = document.createElement("tr");

    const applianceNameCell = document.createElement("td");
    applianceNameCell.textContent = appliance.label;
    row.appendChild(applianceNameCell);

    const usageInputCell = document.createElement("td");
    const usageInput = document.createElement("input");
    usageInput.type = "number";
    usageInput.id = `${appliance.id}Usage`;
    usageInputCell.appendChild(usageInput);
    row.appendChild(usageInputCell);

    const timeUnitSelectCell = document.createElement("td");
    const timeUnitSelect = document.createElement("select");
    timeUnitSelect.id = `${appliance.id}TimeUnit`;

    const hourOption = document.createElement("option");
    hourOption.value = "hours";
    hourOption.textContent = "Hours";
    timeUnitSelect.appendChild(hourOption);

    const minuteOption = document.createElement("option");
    minuteOption.value = "minutes";
    minuteOption.textContent = "Minutes";
    timeUnitSelect.appendChild(minuteOption);

    timeUnitSelectCell.appendChild(timeUnitSelect);
    row.appendChild(timeUnitSelectCell);

    tableBody.appendChild(row);
  });

  const energyForm = document.getElementById("energyForm");
  energyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    calculateEnergyUsage();
  });
});

function calculateEnergyUsage() {
    const usageData = [];
  
    selectedAppliances.forEach((appliance) => {
      const usageInput = document.getElementById(`${appliance.id}Usage`);
      const timeUnitSelect = document.getElementById(`${appliance.id}TimeUnit`);
      
  
      console.log(`appliance: ${appliance.label}`);
      console.log(`usageInput: ${usageInput.value}`);
      console.log(`timeUnitSelect: ${timeUnitSelect.value}`);
      
  
      const usageValue = parseFloat(usageInput.value);
      const timeUnitValue = timeUnitSelect.value;
     
  
      console.log(`usageValue: ${usageValue}`);
      console.log(`timeUnitValue: ${timeUnitValue}`);
      
  
      let kilowatts = 0;
  
      if (appliance.type === "light") { // Adjust the calculation for lightbulbs
        kilowatts = usageValue * lightbulbsValue * appliance.power;
      } else {
        if (timeUnitValue === "hours") {
          kilowatts = usageValue * appliance.power;
        } else if (timeUnitValue === "minutes") {
          kilowatts = (usageValue / 60) * appliance.power;
        }
      }
  
      const monthlyKilowatts = kilowatts * 24 * 30;
      const cost = monthlyKilowatts * 0.33;
  
      usageData.push({
        label: appliance.label,
        kilowatts: kilowatts,
        cost: cost,
      });
    });
  
    localStorage.setItem("usageData", JSON.stringify(usageData));
  
    // Save the usage data to history
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(usageData);
    localStorage.setItem("history", JSON.stringify(history));
  
    // Redirect to the results page
    window.location.href = "results.html";
  }