const mongoose = require("mongoose");

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true };
    mongoose.connect(process.env.DB_URL, connectionParams);

    mongoose.connection.on("connected", () => {
        console.log("Connected to Database Successfully");
    });

    mongoose.connection.on("error", () => {
        console.log("Connection to Database Failed");
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Connection to Database Closed");
    });
};

module.exports = dbConnect;
