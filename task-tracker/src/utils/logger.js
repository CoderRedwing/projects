const log = (message) => {
    console.log(`[LOG]: ${message}`);
};

const error = (message) => {
    console.error(`[ERROR]: ${message}`);
};

module.exports = { log, error };
