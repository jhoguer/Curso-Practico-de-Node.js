const remote = require('./remote');
const config = require('../config');

module = remote(config.cacheService.host, config.cacheService.port);