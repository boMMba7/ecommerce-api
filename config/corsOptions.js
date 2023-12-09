const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        //TODO remove !origem before upload server.. just to test on Postman
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`" ${origin} " Not allowed by CORS`));
        }
    },
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;
