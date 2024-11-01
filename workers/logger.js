export const logger = {
    info: (message) => {
        console.log(`INFO: ${message}`);
    },
    warn: (message) => {
        console.warn(`WARN: ${message}`);
    },
    error: (message) => {
        console.error(`ERROR: ${message}`);
    },
    success: (message) => {
        console.log(`SUCCESS: ${message}`);
    },
    debug: (message) => {
        if (__ENV.DEBUG === 'true') {
            console.log(`DEBUG: ${message}`);
        }
    }
};
