import logger from 'consola';

export { logger };

export const useLogger = (tag, options = {}) => (tag ? logger.create(options).withTag(tag) : logger);
