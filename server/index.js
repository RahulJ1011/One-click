const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))
const port = process.env.PORT || 5000;

app.listen(port,()=> {
    console.log(`server is listening on ${port}`)
})