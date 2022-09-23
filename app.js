const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const app = express();
const ApiError = require("./app/api-error");

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});
module.exports = app;