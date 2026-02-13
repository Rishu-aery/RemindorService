const amqplib = require('amqplib');
const { MESSAGE_BROCKER_URL, EXCHANGE_NAME, QUEUE_NAME } = require("../config/serverConfig")

const createChannel = async () => {
    try {
        const connect = await amqplib.connect(MESSAGE_BROCKER_URL);
        const channel = await connect.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, bindingKey ) => {
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);
        channel.consume(applicationQueue.queue, msg => {
            console.log("Recieved Data!:", msg.content.toString());
            channel.ack(msg);
        })
    } catch (error) {
        throw error;
    }
}

const publishMessage = async (channel, bindingKey, message) => {
    try {
        await channel.assertQueue(QUEUE_NAME);
        channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}