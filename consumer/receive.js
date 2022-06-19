const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", (error0, connection) => {
    if(error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if(error1) {
            throw error1;
        }

        let queue = 'test';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            console.log(`[X] Received ${msg.content.toString()}`);
        }, {
            noAck: true
        });
    });
})