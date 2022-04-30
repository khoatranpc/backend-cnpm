require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000 || process.env.PORT;
const cors = require('cors');
const Router = require('./routes');
const { default: mongoose } = require('mongoose');
const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/cnpm');
    app.use(cors());

    app.use(express.json());
    app.use('/api', Router);
    app.listen(port, () => {
        console.log(`This server is running on port ${port}`);
    })
}
main();