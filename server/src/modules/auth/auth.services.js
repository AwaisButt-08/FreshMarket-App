import { User } from "../users/user.model.js"
import { Profile } from "../users/profile.model.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { signAccessToken, signRefreshToken } from "./auth.token.js";

export const registerUser = async ({ email, password, role, displayName }) => {
    try {

        // console.log("DATABASE:", User.db.name);
        // console.log("COLLECTION:", User.collection.name);
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const error = new Error("Duplicate Email!!");
            error.statusCode = 409;
            throw error;

        }

        if (password.length < 8) {
            throw new Error("Password must be atleast characters long");
        };

        const passwordHash = await bcrypt.hash(password, 8);

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);



        const user = await User.create({
            email,
            passwordHash,
            role,
            isVerified: false,
            otp,
            otpExpiresAt,
        });

        console.log("GENERATED OTP:", otp);
        console.log("SAVED OTP:", user.otp);

        const profile = await Profile.create({
            userId: user._id,
            displayName: displayName || email.split("@")[0],
        });

        return ({
            userId: user._id,
            otp: process.env.NODE_ENV === "development" ? otp : undefined,
        })

    } catch (error) {
        throw error;
    }


};

export const verifyOtp = async ({ email, otp }) => {
    try {
        email = email.trim().toLowerCase();
        const exist = await User.findOne({ email })

        if (!exist) {
            throw new Error("User not exist!");
        }

        console.log("EMAIL:", email);
        console.log("OTP FROM REQUEST:", otp);
        console.log("OTP FROM DATABASE:", exist.otp);
        console.log("OTP TYPE:", typeof otp);
        console.log("DATABASE OTP TYPE:", typeof exist.otp);

        if (String(exist.otp) !== otp) {
            throw new Error("Invalid Otp!");
        }

        if (exist.otpExpiresAt < new Date()) {
            throw new Error("Otp expires");
        }

        exist.isVerified = true;

        exist.otp = null;
        exist.otpExpiresAt = null;

        await exist.save();

        return { verified: true };

    } catch (error) {
        throw new Error(error.message, 400);

    }

};

export const loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email }).select("+passwordHash")

        if (!user) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const passwordCompare = await bcrypt.compare(password, user.passwordHash);

        if (!passwordCompare) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }


        if (!user.isVerified) {
            const error = new Error("Please verify your email first");
            error.statusCode = 403;
            throw error;
        }

        const profile = await Profile.findOne({ userId: user._id });

        const accessToken = signAccessToken(user)

        if (!accessToken) {
            throw new Error("Bad Creds!", 401);
        }
        const refreshToken = signRefreshToken(user);

        if (!refreshToken) {
            const error = new Error("Unverified!");
            error.statusCode = 403;
            throw error;
        }

        user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        await user.save();

        return ({
            accessToken, refreshToken,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                displayName: profile?.displayName || ""
            }
        });
    } catch (error) {
        throw error;
    }
};

export const refreshAccessToken = async ({ refreshToken }) => {

    if (!refreshToken) {
        throw new Error("Token is required");
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.sub).select("+refreshTokenHash");

    if (!user) {
        throw new Error("User does not exist");
    }

    if (!user.refreshTokenHash) {
    throw new Error("Refresh token has been revoked");
}

    const match = await bcrypt.compare(
        refreshToken,
        user.refreshTokenHash
    );

    if (!match) {
        throw new Error("Invalid refresh token");
    }

    const accessToken = signAccessToken(user);

    const newRefreshToken = signRefreshToken(user)

    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

    await user.save();

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};

export const logoutUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User don't exist");
        error.statusCode = 404;
        throw error;
    }

    user.refreshTokenHash = undefined;
    user.accessToken = undefined;

    await user.save();

    return ({
        success: true,
        message:"Logout successfully!"
    })
};

export const getMe = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new Error("User does not exist!!");
        }

        const profile = await Profile.findOne({ userId });

        

       await user.save();

        return { user, profile}
    } catch (error) {
        throw error;
    }

};

