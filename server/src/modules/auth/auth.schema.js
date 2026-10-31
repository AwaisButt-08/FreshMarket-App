
export const validateRegisterBody = (body) => {
    const errors = [];

    const { email, password, role } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Valid email is required");
    }

    if (!password || password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    if (!role || !["vendor", "customer"].includes(role)) {
        errors.push("Role must be vendor or customer");
    }

    return errors;
};


export const validateLoginBody = (body) => {
    const errors = [];

    const { email, password } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Valid email is required");
    }

    if (!password) {
        errors.push("Password is required");
    }

    return errors;
};


export const validateVerifyOtpBody = (body) => {
    const errors = [];

    const { email, otp } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Valid email is required");
    }

    // if (!otp || !/^\d{6}$/.test(otp)) {
    //     errors.push("OTP must contain exactly 6 digits");
    // }

    const cleanOtp = String(otp ?? "").trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
        errors.push("OTP must contain exactly 6 digits");
    }


    return errors;
};
