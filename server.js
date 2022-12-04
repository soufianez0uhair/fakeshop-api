require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {readdirSync} = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());

readdirSync(path.join(__dirname, 'routes')).map(r => app.use(`/api/${r.split('.')[0]}`, require(path.join(__dirname, 'routes', r))));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(err => console.log(err.message))