//  Allow just the domain in this list to access
const allowedOrigins = [
    // Render.com
    "https://render.com/",
    "18.156.158.53",
    "18.156.42.200",
    "52.59.103.54",

    // Ecommerce Frontend
    "https://ecommerce-bbnd.onrender.com",

    //localhost Vue just for test
    "http://localhost:3000",
];

module.exports = allowedOrigins;
