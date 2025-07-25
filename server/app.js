const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger.js');
const diaryRouter = require('./middleware/diary.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
    res.json({
        name: "Discretion",
        description: "Send and receive private messages."
    })
});

app.use('/entries', diaryRouter);

module.exports = app;