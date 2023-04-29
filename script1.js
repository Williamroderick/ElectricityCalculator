document.getElementById("energyForm").addEventListener("submit", function (event) {
  event.preventDefault();
  storeSelectedAppliancesAndGoToNext();
});

function storeSelectedAppliancesAndGoToNext() {
  const appliances = [
    { id: "lights", label: "Lights", power: 0.060 },
    { id: "fridge", label: "Fridge", power: 0.200 },
    { id: "desktop_computer", label: "Desktop Computer", power: 0.250 },
    { id: "stove", label: "Stove", power: 2.000 },
    { id: "microwave", label: "Microwave", power: 1.000 },
    { id: "heater", label: "Heater", power: 1.500 },
    { id: "smartphone_charger", label: "Smartphone Charger", power: 0.005 },
    { id: "tablet_charger", label: "Tablet Charger", power: 0.010 },
    { id: "tv", label: "TV", power: 0.200 },
    { id: "electric_fan", label: "Electric Fan", power: 0.080 },
    { id: "rice_cooker", label: "Rice Cooker", power: 0.500 },
    { id: "air_conditioner", label: "Air Conditioner", power: 0.850 },
  ];

  const selectedAppliances = appliances.filter((appliance) => document.getElementById(appliance.id).checked);

  localStorage.setItem("selectedAppliances", JSON.stringify(selectedAppliances));
  localStorage.setItem("zipcode", document.getElementById("zipcodeSelect").value);
  localStorage.setItem("price_goal", document.getElementById("price_goal").value);

  // Redirect to thex second page
  window.location.href = "second_page.html";
}