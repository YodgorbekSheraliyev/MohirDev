const Logger = require('./modules/event')
const logger =  new Logger()

logger.on('msg', (data) => {
   console.log(data);
   return
});
logger.log('get', '/user/profile')
logger.log('post', '/user/profile')
logger.log('put', '/user/profile')