const appConfig = () => ({
  topic: process.env.TOPIC,
  subscription: process.env.SUBSCRIPTION,
  port: process.env.PORT || 3000,
});

module.exports = {
  appConfig,
};
