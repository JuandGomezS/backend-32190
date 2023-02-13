import winston from 'winston'
import moment from 'moment'

function warnLog() {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: () => {
                    return moment().format('YYYY-MM-DD HH:mm:ss');
                }
            }),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({ level: 'debug' }),
            new winston.transports.File({ filename: './logs/warn.log', level: 'warn' })
        ]
    })
}

function errorLog() {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: () => {
                    return moment().format('YYYY-MM-DD HH:mm:ss');
                }
            }),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({ level: 'debug' }),
            new winston.transports.File({ filename: './logs/error.log', level: 'error' })
        ]
    })
}

function debugLog() {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: () => {
                    return moment().format('YYYY-MM-DD HH:mm:ss');
                }
            }),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({ level: 'debug' })
        ]
    })
}

let warnLogger = warnLog();
let errorLogger = errorLog();
let debugLogger = debugLog()

export {
    warnLogger,
    errorLogger,
    debugLogger
}