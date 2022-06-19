const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    let queue = "test";
    

    channel.assertQueue(queue, {
      durable: false,
    });

    for (let i = 0; i <= 9000; i++) {
      let msg = `Hello Sir.Rod!! TAG:${i}`;
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`[X] Sent ${msg}`);
    }
  });

  /*   setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500); */
});
