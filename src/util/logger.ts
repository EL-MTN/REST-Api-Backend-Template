import { createLogger, format, transports } from 'winston';

const logLevels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	trace: 5,
};

export const logger = createLogger({
	levels: logLevels,
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.json()
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({
					all: true,
				}),
				format.timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				format.printf(
					(info) =>
						`[app] | ${info.timestamp} | ${info.level} | ${info.message}` +
						(info.splat !== undefined ? `${info.splat}` : ' ')
				)
			),
			level: 'debug',
		}),
		new transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
		new transports.File({
			filename: 'logs/combined.log',
		}),
	],
});
