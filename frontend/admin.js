// ===============================
// Admin.js for Plant Nursery
// ===============================

// Backend API URLs
const PLANTS_API = "http://localhost:5000/plants";
const ORDERS_API = "http://localhost:5000/orders";

// -------------------------------
// Load Plants when admin.html opens
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadPlants();
  loadOrders();

  // Handle Add Plant form submission
  const form = document.getElementById("addPlantForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const plantData = {
      name: form.name.value,
      category: form.category.value,
      care: form.care.value,
      price: parseFloat(form.price.value),
      stock: parseInt(form.stock.value)
    };

    try {
      const response = await fetch(PLANTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plantData)
      });

      if (response.ok) {
        alert("✅ Plant added successfully!");
        form.reset();
        loadPlants(); // refresh list
      } else {
        alert("❌ Error adding plant");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server not reachable");
    }
  });
});

// -------------------------------
// Fetch and display Plants
// -------------------------------
async function loadPlants() {
  const plantList = document.getElementById("plantList");
  plantList.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(PLANTS_API);
    const plants = await response.json();

    plantList.innerHTML = "";
    plants.forEach((plant) => {
      const div = document.createElement("div");
      div.className = "plant-item";
      div.innerHTML = `
        <h3>${plant.name}</h3>
        <p>Category: ${plant.category}</p>
        <p>Care: ${plant.care}</p>
        <p>Price: $${plant.price}</p>
        <p>Stock: ${plant.stock}</p>
        <button onclick="deletePlant('${plant._id}')">Delete</button>
      `;
      plantList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    plantList.innerHTML = "<p>Could not load plants.</p>";
  }
}

// -------------------------------
//