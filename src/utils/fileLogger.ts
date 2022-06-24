import winston from 'winston';

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'focuser.log', options: {
        flags: 'w'
      } })
    ]
  });

export default logger;