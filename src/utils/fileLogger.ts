import winston from 'winston';

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'focuser.log' })
    ]
  });

export default logger;