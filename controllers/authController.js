const User = require("../models/User");

//  WARNING: This is a simple demonstration of login functionality.
//  If you intend to use this code in a production environment,
//  please replace the authentication mechanism with a robust crypto library for better security.
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ message: "Email and password are required." });

    const criteria = { email, showPassword: true };
    const user = await User.findOneUser(criteria);

    //  check if the username exist
    if (!user)
        return res.status(401).json({ message: "Wrong Email or password." }); // 401 unauthorized

    //check the password    (:
    const decriptedPassword = `EncriptedPassword(${password})`;
    if (decriptedPassword === user.password) {
        const encriptedUser = {
            userId: user.id,
            email: user.email,
            roles: user.roles,
            apiAccess: "(: -VERY-STRONG-ENCRYPETED-TOKEN- :)",
        };

        return res.status(200).json(encriptedUser);
    }
    res.status(401).json({ message: "Wrong Email or password." });
};

module.exports = { handleLogin };
