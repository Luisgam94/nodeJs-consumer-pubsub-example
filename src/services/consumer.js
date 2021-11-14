const { PubSub } = require('@google-cloud/pubsub');
const { initLogger } = require('../config/logging');

const consumerMessages = async (subscriptionName) => {
  const log = initLogger();

  const pubSubClient = new PubSub();
  const subscription = pubSubClient.subscription(subscriptionName);

  const messageHandler = message => {
    log.info(`Received message ${message.id}:`);
    log.info({data: JSON.parse(message.data) }, 'data received');
    //console.log(`\tAttributes: ${message.attributes}`);
    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.addListener('message', messageHandler);
};

module.exports = {
  consumerMessages,
};
