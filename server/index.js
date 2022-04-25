require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000 || process.env.PORT;
const cors = require('cors');

const main = async () => {
    app.use(cors());
    app.listen(port, () => {
        console.log(`This server is running on port ${port}`);
    })
}
main();