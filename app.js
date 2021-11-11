const express = require('express');
const api = require('./api/api');
const app = express();

api(app);

app.listen(5000, () => {
    console.log('running');
});

