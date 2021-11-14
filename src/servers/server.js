const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const { appConfig } = require('../config/configEnv');
const { receivedMessages } = require('../services/serviceImpl')
const { initLogger } = require('../config/logging');

let app;

const startApp = async () => {
  const log = initLogger();

  const config = appConfig();

  app = new Koa();

  app.use(async (ctx, next) => {
    ctx.config = config;
    await next();
    return ctx;
  });
  app.use(koaBodyParser());

  await receivedMessages(config);

  app.listen(config.port, () => {
    log.info(`Server running on http://localhost:${config.port}`);
  });

  return app;
};

module.exports = {
  startApp,
};
