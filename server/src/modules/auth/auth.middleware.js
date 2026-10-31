
import jwt from "jsonwebtoken";
import {
    validateRegisterBody,
    validateLoginBody,
    validateVerifyOtpBody,
} from "./auth.schema.js";

// 1. Verify access token
export const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token is required"
            });
        }

        console.log("AUTH HEADER:", authHeader);

        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );

        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


// 2. Register validation
// export const validateRegister = (req, res, next) => {
//     const { error } = validateRegisterBody(req.body);

//     if (error) {
//         return res.status(400).json({
//             message: error.details[0].message
//         });
//     }

//     next();
// };

export const validateRegister = (req, res, next) => {
    const errors = validateRegisterBody(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};



// 3. Login validation
// export const validateLogin = (req, res, next) => {
//     const { error } = validateLoginBody(req.body);

//     if (error) {
//         return res.status(400).json({
//             message: error.details[0].message
//         });
//     }

//     next();
// };

export const validateLogin = (req, res, next) => {
    const errors = validateLoginBody(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};


// 4. OTP validation
export const validateVerifyOtp = (req, res, next) => {
    const errors = validateVerifyOtpBody(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};
