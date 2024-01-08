const EventEmitter = require('events');
class Logger extends EventEmitter {
    log(method, route){
        this.emit('msg', {method, route})
    }
}
module.exports = Logger