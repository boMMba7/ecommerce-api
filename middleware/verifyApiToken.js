const apiAccessToken = "(: -VERY-STRONG-ENCRYPETED-TOKEN- :)";

const verifyApiToken = (req, res, next) => {
    if (req.headers.apitoken !== apiAccessToken) return res.sendStatus(401);
    next();
};

module.exports = verifyApiToken;
