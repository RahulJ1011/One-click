const express = require('express');
const app = express();
const {socketmiddleware} = require('./middlewares/socketMiddleware')
const dotenv = require('dotenv');
const cors = require('cors')
const http = require('http');
const {Server} = require('socket.io')
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
io.use(socketmiddleware);


io.on('connection',(socket)=> {
    console.log('a user connected');

    socket.on('disconnect',()=> {
        console.log('a user disconnected');
    })
})


app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))


app.use(express.json());


const port = process.env.PORT || 5000;

app.listen(port,()=> {
    console.log(`server is listening on ${port}`)
})