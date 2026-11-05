import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaRegEnvelope } from 'react-icons/fa'
import { MdOutlineLock, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { useAuth } from '../Hooks/useAuth'
import { toast } from 'react-toastify'
import { useState } from 'react'
const Login = () => {
    const [visible, setVisible] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const[email,setEmail] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            const response = await login(email,password)
            if (response) {
            toast.success("Login successful!");

            const role = response.user.role;

            if (role === "vendor") {
                navigate("/vendor/dashboard");
            } else if (role === "customer") {
                navigate("/");
            }
        }
        } catch (error) {
            toast.error(error.message || "Login failed");
        }
    }

    return (
        <div className='min-h-screen  flex items-center justify-center shadow-sm'>
            <div className="bg-white w-[450px] h-[400px] text-center min-h rounded-lg ">
                <h1 className="text-blue-600 text-3xl font-semibold mt-5">Welcome Back</h1>
                <p className='text-blue-900 text-sm mb-10'>Please enter your details to sign in</p>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4 justify-items-start relative">
                        <h1 className="ml-5 text-blue-800">Email Address</h1>

                        <FaRegEnvelope className="absolute left-9 top-[48px] -translate-y-1/2 text-gray-400" />

                        <input
                            type="email"
                            value={email}
                            placeholder="your@example.com"
                            onChange={(e)=> setEmail(e.target.value)}
                            className="border-2 border-blue-500 h-[45px] w-[90%]  rounded-lg pl-9 pr-3 placeholder:text-sm focus:outline-none"
                        />
                    </div>
                    <div className='mb-4 justify-items-start relative'>
                        <h1 className=" ml-5 text-blue-800">Password</h1>
                        <MdOutlineLock className="absolute left-9 top-[48px] -translate-y-1/2 text-gray-400" />
                        <input type={visible ? "text" : password} placeholder='Enter your password' className="border-2 border-blue-500 h-[45px] w-[90%] rounded-lg placeholder:text-sm pl-9 pr-3 placeholder:items-center focus:outline-none " value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        {visible ? (<MdOutlineVisibilityOff className="absolute right-9 top-[48px] -translate-y-1/2 text-gray-500 text-xl cursor-pointer" onClick={() => setVisible(false)} />)

                            : (<MdOutlineVisibility className="absolute right-9 top-[48px] -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                                onClick={() => setVisible(true)}
                            />)
                        }
                    </div>
                    <div className='flex justify-center'>
                        <button className="w-[90%] h-[45px] mt-2 font-semibold rounded-lg text-white bg-blue-600 mb-4 flex items-center justify-center gap-1">Login <FaArrowRight className='text-sm' /></button>
                    </div>
                    <div className='flex justify-center gap-1'>
                        <p>Not have any account?</p>
                        <Link className='text-blue-500 mb-5' to='/register'>Register</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
