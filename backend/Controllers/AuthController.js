const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const dbsql=require("../config/db")
const sendEmail = require('../utils/sendEmail');
const  Brand_Manager  = require('../Models/Brand_Manager');
const crypto = require('crypto');
const { Op } = require('sequelize');

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, you can login', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userModel = new UserModel({
            name,
            email,
            password: hashedPassword,
            role //  this is the fix
        });

        await userModel.save();

        res.status(201).json({
            message: "Signup successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        /*const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )*/
       // controllers/auth.js ya authController.js
       const jwtToken = jwt.sign({
        email: user.email,
        _id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
     
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name,
                role: user.role //  ADD THIS LINE!
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


//Create MYSQL USER



const signupbrand = async (req, res) => {
    try {
        const { first_name, last_name, business_email, password, business_phone } = req.body;

        // 1. Validate request
        if (!first_name || !last_name || !business_email || !password || !business_phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // 2. Check if the brand already exists
        const existingBrand = await Brand_Manager.findOne({
            where: { business_email: business_email }
        });

        if (existingBrand) {
            return res.status(409).json({
                success: false,
                message: 'Brand already exists, you can login'
            });
        }

        //3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Generate Verification Code (6-digit)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        //  5. Create the Brand Manager entry
        const newBrand = await Brand_Manager.create({
            first_name,
            last_name,
            business_email,
            password: hashedPassword,
            business_phone,
            verification_code: verificationCode,
            verified: false
        });

        // 6. Generate Verification Link (only to redirect to the page)
        const verificationLink = `http://localhost:3000/verify_otp`;

        // 7. Send verification email
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #f4f7fa;">
                <div style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Welcome Image" style="width: 100%; max-width: 400px; margin-bottom: 20px; border-radius: 8px;" />
                    <h2 style="color: #333;">Welcome to Our Platform!</h2>
                </div>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Thank you for registering with us! To complete your registration, please verify your email address using the verification code below:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${verificationLink}" style="background-color: #28a745; color: #fff; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Enter Verification Code
                    </a>
                </div>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Your Verification Code:
                </p>
                <h2 style="text-align: center; color: #333;">${verificationCode}</h2>
                <p style="font-size: 14px; color: #999; text-align: center;">
                    If you didn’t sign up, you can safely ignore this email.
                </p>
                <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #aaa; text-align: center;">
                    © ${new Date().getFullYear()} Our Platform | All rights reserved.
                </p>
            </div>
        `;

        await sendEmail(business_email, 'Verify your Email - Platform Registration', htmlContent);

        //8. Respond with success
        res.status(201).json({
            success: true,
            message: 'Brand signup successfully. Please check your email for verification.',
            data: { id: newBrand.id, first_name, last_name, business_email }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
//Resend OTP Logic Impliment Here.


const MAX_LOGIN_ATTEMPTS = 5;         // Maximum attempts allowed
const LOCK_TIME = 15 * 60 * 1000;     // Lock duration in milliseconds (15 minutes)

const loginbrand = async (req, res) => {
    try {
        // Extract email/phone and password from the request body
        const { business_email, business_phone, password } = req.body;
        const errorMsg = 'Authentication failed, email/phone or password is incorrect.';

        // 1. Validate input fields
        if ((!business_email && !business_phone) || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide either email or phone and the password.'
            });
        }

        console.log("Login Attempt: ", business_email || business_phone);

        // 2. Construct the query condition based on input
        const queryCondition = business_email
            ? { business_email: business_email }
            : { business_phone: business_phone };

        // 3. Check if the brand exists
        const brand = await Brand_Manager.findOne({ where: queryCondition });

        // If brand not found
        if (!brand) {
            return res.status(403).json({ 
                success: false, 
                message: errorMsg 
            });
        }

        // 4. Check if the account is verified
        if (!brand.verified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email before logging in.'
            });
        }

        // 5. Check if the account is locked
        if (brand.lock_until && brand.lock_until > Date.now()) {
            const unlockTime = new Date(brand.lock_until).toLocaleTimeString();
            return res.status(403).json({
                success: false,
                message: `Account is locked due to multiple failed login attempts. Try again after ${unlockTime}.`
            });
        }

        // 6. Compare the password
        const isPassEqual = await bcrypt.compare(password, brand.password);

        // If password does not match
        if (!isPassEqual) {
            brand.login_attempts += 1;  // Increment login attempts

            // Lock account if max attempts exceeded
            if (brand.login_attempts >= MAX_LOGIN_ATTEMPTS) {
                brand.lock_until = Date.now() + LOCK_TIME;
                console.log(`Account locked until ${new Date(brand.lock_until).toLocaleTimeString()}`);
            }

            await brand.save(); // Save the changes to the database

            return res.status(403).json({ 
                success: false, 
                message: `Incorrect password. ${MAX_LOGIN_ATTEMPTS - brand.login_attempts} attempts remaining.` 
            });
        }

        // 7. If login is successful, reset attempts and lock time
        brand.login_attempts = 0;
        brand.lock_until = null;
        await brand.save();

        // 8. Generate JWT token
        const jwtToken = jwt.sign(
            {
                email: brand.business_email,
                phone: brand.business_phone,
                id: brand.id,
                name: `${brand.first_name} ${brand.last_name}`
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        console.log("Login Successful for:", business_email || business_phone);

        // 9. Send response
        res.status(200).json({
            success: true,
            message: "Login Successful",
            jwtToken,
            email: brand.business_email,
            phone: brand.business_phone,
            name: `${brand.first_name} ${brand.last_name}`
        });

    } catch (err) {
        console.error("Internal Server Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};






// Verify Code Logic
const verifyCode = async (req, res) => {
    try {
        // Extract data from request body
        const { verification_code } = req.body;

        // Check if verification code is provided
        if (!verification_code) {
            return res.status(400).json({
                success: false,
                message: 'Verification code is required.'
            });
        }

        console.log("Verification Code:", verification_code);

        // Find the user in the database by verification code only
        const brand = await Brand_Manager.findOne({
            where: { verification_code: verification_code }
        });

        // If the brand is not found
        if (!brand) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code.'
            });
        }

        // If the user is already verified
        if (brand.verified) {
            return res.status(400).json({
                success: false,
                message: 'Account is already verified.'
            });
        }

        // Update the verification status
        await Brand_Manager.update({ verified: true, verification_code: null }, { 
            where: { id: brand.id }
        });

        console.log(`Account with ID ${brand.id} verified successfully.`);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Account verified successfully!'
        });

    } catch (err) {
        console.error("Error in verification process:", err.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};



const forgotPassword = async (req, res) => {
    try {
        const { business_email } = req.body;

        if (!business_email) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        //1. Find the user by email
        const brand = await Brand_Manager.findOne({ where: { business_email } });

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Email not found. Please register first."
            });
        }

        //2. Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // 3. Set the token and expiration (15 minutes from now)
        brand.reset_password_token = resetToken;
        brand.reset_password_expires = Date.now() + 15 * 60 * 1000;
        await brand.save();

        // 4. Create the reset link
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        // 5. Send Email with the reset link
        const htmlContent = `
            <div>
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your password. Click the link below to reset it:</p>
                <a href="${resetLink}" style="background-color: #28a745; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>This link will expire in 15 minutes.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
        `;

        await sendEmail(business_email, 'Password Reset Request', htmlContent);

        res.status(200).json({
            success: true,
            message: 'Password reset link has been sent to your email address.'
        });

    } catch (error) {
        console.error(" Error in Forgot Password:", error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token, new_password } = req.body;

        if (!token || !new_password) {
            return res.status(400).json({
                success: false,
                message: "Invalid request. Please provide token and new password."
            });
        }

        // 1. Find the user with matching reset token and check expiry
        const brand = await Brand_Manager.findOne({
            where: {
                reset_password_token: token,
                reset_password_expires: { [Op.gt]: new Date() }
            }
        });

        if (!brand) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token."
            });
        }

        // 2. Hash the new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        //3. Update the user's password and clear the reset fields
        await brand.update({
            password: hashedPassword,
            reset_password_token: null,
            reset_password_expires: null
        });

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully.'
        });

    } catch (error) {
        console.error(" Error in Reset Password:", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const resendOTP = async (req, res) => {
    try {
        const { business_email } = req.body;

        if (!business_email) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        // Find the brand by email
        const brand = await Brand_Manager.findOne({ where: { business_email } });

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found. Please register first."
            });
        }

        // Generate a new 6-digit verification code
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Update the verification code in the database
        brand.verification_code = newVerificationCode;

        // ❗ Optionally unverify for testing purposes
        brand.verified = false;

        await brand.save();

        // Send verification email
        const verificationLink = `http://localhost:3000/verify_otp`;

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #f4f7fa;">
                <div style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Welcome Image" style="width: 100%; max-width: 400px; margin-bottom: 20px; border-radius: 8px;" />
                    <h2 style="color: #333;">Verification Code Resent!</h2>
                </div>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Use the code below to verify your account.
                </p>
                <h2 style="text-align: center; color: #333;">${newVerificationCode}</h2>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${verificationLink}" style="background-color: #007bff; color: #fff; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Enter Verification Code
                    </a>
                </div>
                <p style="font-size: 14px; color: #999; text-align: center;">
                    If you didn’t request this, you can ignore this email.
                </p>
            </div>
        `;

        await sendEmail(business_email, 'Resend Verification Code - Platform', htmlContent);

        return res.status(200).json({
            success: true,
            message: "Verification code resent successfully."
        });

    } catch (err) {
        console.error("Error in resend OTP:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


module.exports = {
    signup,
    login,
    signupbrand,
    loginbrand,
    verifyCode,
    forgotPassword,
    resetPassword,
    resendOTP
}