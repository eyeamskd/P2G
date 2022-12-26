const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    price: { type: Number, required: true },
    fulladdress: { type: String, required: true },
    roomType: { type: String, required: true },
    location: { type: String, required: true },
    available: { type: Boolean, required: true },
    images: { type: [String] },
});

module.exports = mongoose.model("hostel", hostelSchema);
