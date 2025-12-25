
const Gym = require('../Modals/gym')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {

    try {
        const { userName, password, gymName, profilePic, email } = req.body;
        const isExist = await Gym.findOne({ userName });

        if (isExist) {//if user already exist.
            return res.status(400).json({
                error: "Username Already Exist, Please try with other username"
            })
        } else {

            const hashedPassword = await bcrypt.hash(password, 10);

            const newGym = new Gym({ userName, password: hashedPassword, gymName, profilePic, email });
            await newGym.save();

            return res.status(201).json({ message: "User registered successfully", success: "yes", data: newGym });
        }
    } catch (err) {
        res.status(500).json({ error: "error msg" })
    }


}

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
}

exports.login = async (req, res) => {

    try {
        const { userName, password } = req.body;
        const gym = await Gym.findOne({ userName });


        if (gym && await bcrypt.compare(password, gym.password)) {

            const token = jwt.sign({gym_id: gym._id}, process.env.JWT_SecretKey)
            res.cookie("cookieToken", token, cookieOptions);

            return res.json({ message: "logged in successfully", success: "true", gym });

        } else {
            
            return res.status(400).json({ error: "invalid credentials" });
        }


    } catch (err) {
        res.status(500).json({ error: "server error" })
    }

};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})


exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const gym = await Gym.findOne({ email });
        if (gym) {
            const buffer = crypto.randomBytes(4);
            const token = buffer.readUInt32BE(0) % 900000 + 100000;
            const hashedOtp = crypto
                .createHash("sha256")
                .update(token.toString())
                .digest("hex");
            gym.resetPasswordToken = hashedOtp;
            gym.resetPasswordExpires = Date.now() + 600000; // 10 minutes
            await gym.save();

            // Here, you would typically send the OTP to the user's email address.
            // For demonstration purposes, we'll just return it in the response.



            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Password Reset OTP",
                text: `Your OTP for password reset is ${token}. It is valid for 10 minutes.`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: "server error", errorMsg: error });
                } else {
                    return res.status(200).json({ message: "OTP sent to your email" });
                }
            });


        } else {
            return res.status(400).json({ error: "Gym not found" });
        }

    } catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}


exports.checkOtp = async (req, res) => {

    try {
        const { email, otp } = req.body;
        const hashedOtp = crypto
            .createHash("sha256")
            .update(otp.toString())
            .digest("hex");
        const gym = await Gym.findOne({
            email,
            resetPasswordToken: hashedOtp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!gym) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }
        return res.status(200).json({ message: "OTP verified successfully" });




    } catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }

}



exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const gym = await Gym.findOne({ email });

        if (!gym) {
            return res.status(400).json({ error: "Some technical issue, please try again" });
        }
        else{
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            gym.password = hashedPassword;
            gym.resetPasswordToken = undefined;
            gym.resetPasswordExpires = undefined;

            await gym.save();
            return res.status(200).json({ message: "Password reset successfully" });
        }
    }catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}



exports.logout = async (req, res) => {
    try {
        res.clearCookie("cookieToken", cookieOptions).json({message: "logged out successfully"});
    }catch(err){
        res.status(500).json({error: "server error"})
    }   
    return res.status(200).json({message: "logged out successfully"});
}
