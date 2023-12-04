const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`" ${origin} " Not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
