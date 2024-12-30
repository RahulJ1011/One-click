const socketmiddleware = (socket,next)=>
{
    const userId = socket.handshake.query.userId

    if(userId)
    {
        socket.join(userId.toString());
        next();
    }
    else
    {
        next(new Error('Authentication error'))
    }
}

module.exports = {socketmiddleware};