module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) { // connection 이벤트가 발생했을때 function(socket) 콜백함수 실행
        console.log('socket connect !');

        socket.on('message', function (msg) {
            console.log(msg);
            io.emit('message', msg); // 메세지를 보내는 로직
            // socket.broadcast.emit('all message', msg) // 전체에게 보내는 메세지
        });

        socket.on('disconnect', function () { // connection이 된 후에 disconnect 이벤트 발생 function() 콜백함수 실행
            console.log('socket disconnect !');
        });
    });
    return io;
}