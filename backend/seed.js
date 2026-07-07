const mongoose = require("mongoose");
const Plant = require("./models/Plant"); // adjust path if your model is elsewhere

mongoose.connect("mongodb://localhost:27017/plant-nursery")
    .then(async () => {
        await Plant.insertMany([
            { name: "Rose", category: "Flower", care: "Water daily", price: 50, stock: 20 },
            { name: "Tulip", category: "Flower", care: "Needs sunlight", price: 40, stock: 15 },
            { name: "Jasmine", category: "Shrub", care: "Water twice a week", price: 30, stock: 25 }
        ]);
        console.log("✅ Sample plants added");
        mongoose.connection.close();
    })
    .catch(err => console.error("❌ Error seeding data:", err));
