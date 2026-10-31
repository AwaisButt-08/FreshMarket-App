import jwt from "jsonwebtoken";

export const signAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m"
        }
    );
};


export const signRefreshToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString()
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d"
        }
    );
};