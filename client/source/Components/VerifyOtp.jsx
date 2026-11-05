import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiMailCheckFill, RiMailUnreadLine } from 'react-icons/ri'
import { useAuth } from '../Hooks/useAuth'
import { toast } from 'react-toastify'
import { useState } from 'react'
const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const { verifyOtp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyOtp(email, otp.join(""));

            if (response) {
                navigate('/login', { state: { message: 'Verified-please login' } })
            }
        } catch (error) {
            if (error.status === 400) {
                toast.error("Invalid or expired otp")
            } else {
                toast.error(error.message || "Something went wrong");
            }
        }
    };
    return (
        <div className='min-h-screen  flex items-center justify-center shadow-sm'>
            <div className="bg-white w-[450px] h-[380px] justify-center text-center min-h rounded-lg ">
                <div className='bg-blue-600 rounded-full mt-5 mx-auto flex pt-2 pb-2 text-[18px] justify-center items-center text-white w-[45px] h-[45px]'>
                    <RiMailUnreadLine className="text-[22px]" />
                </div>
                <h1 className="text-blue-600 text-3xl font-semibold mt-2">Verify your email</h1>
                <p className='text-blue-900 text-sm mb-8'>We've sent a 6-digit code to your email address <br /> (example@email.com). Please enter it below <br /> to verify your account.</p>
                <form action="" onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");

                                    const newOtp = [...otp];
                                    newOtp[index] = value;
                                    setOtp(newOtp);
                                }}
                                className="border-blue-600 border-2 focus:outline-none"
                                style={{
                                    width: "48px",
                                    height: "54px",
                                    textAlign: "center",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    borderRadius: "8px"
                                }}
                            />
                        ))}
                    </div>
                    <div className='justify-items-center'>
                        <button className="w-[90%] h-[45px] mt-4 font-semibold rounded-lg text-white bg-blue-600 mb-4 flex items-center justify-center gap-1">Verify</button>
                    </div>
                </form>
                <div className='flex justify-center gap-1'>
                    <p>Don't recieve the code?</p>
                    <Link className='text-blue-500 mb-5'>Resend</Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp
