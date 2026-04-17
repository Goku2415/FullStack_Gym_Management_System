const Gym = require("../Modals/gym");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Bearer token

        const decode = jwt.verify(token, process.env.JWT_SecretKey);

        const gym = await Gym.findById(decode.gym_id);

        if (!gym) {
            return res.status(401).json({ error: "Gym not found" });
        }

        req.gym = gym;
        next();

    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

module.exports = auth;