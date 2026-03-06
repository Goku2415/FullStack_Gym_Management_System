const Gym = require("../Modals/gym");
const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookieToken;
        
        if (!token) {
            return res.status(401).json({ error: "No token found" });
        }

        const decode = jwt.verify(token, process.env.JWT_SecretKey);
        console.log("Decoded:", decode);

        const gym = await Gym.findById(decode.gym_id);
        console.log("Gym found:", gym);

        if (!gym) {
            return res.status(401).json({ error: "Gym not found in DB" });
        }

        req.gym = gym;
        next();

    } catch (err) {
        console.log("AUTH ERROR:", err.message);
        return res.status(401).json({ error: err.message });
    }
};



module.exports = auth;