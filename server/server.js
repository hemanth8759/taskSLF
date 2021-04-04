const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 7070;
const router = require('./router/router.js');

app.use(router);

app.listen(port, () => {
    console.log(`Listening at port http://localhost:${port}`)
})