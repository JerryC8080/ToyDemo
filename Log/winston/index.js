/**
 * @author JerryC
 * @date  16/5/29
 * @description
 */
'use strict';
const winston = require('winston');
const config = {
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true,
      label: 'SSOAuth'
    })
  ]
};

const logger = new (winston.Logger)(config);

logger.info('info');
logger.error('error');
logger.warn('warn');
logger.debug('debug');
logger.error(new Error('new error'));
