import { FaRegEnvelope, FaShoppingCart, FaStore } from 'react-icons/fa'
import { MdOutlineLock, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

const Register = () => {
    const [visible, setVisible] = useState(false);
    const [role, setRole] = useState("customer");
    const [confirmVisible, setConfirmVisible] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");


    const { register } = useAuth();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const regis = await register({ email, password, role, displayName });

            if (regis) {
                navigate('/verifyOtp', { state: { email } });
            }
        } catch (error) {
            if (error.status === 409) {
                toast.error("Email already registered");
            }
            else if (error.status === 400) {
                toast.error("Invalid registration data");
            } else {
                toast.error(error.message || "Something went wrong");
            }
        }
    };
    return (
        <div className='min-h-screen  flex items-center justify-center shadow-sm'>
            <div className="register-card bg-white w-[450px] h-[450px] text-center min-h rounded-lg rounded-y-lg overflow-y-scroll ">
                <h1 className="text-blue-600 text-3xl font-semibold mt-5">Create Your Account</h1>
                <p className='text-blue-900 text-sm mb-10'>Join the FreshMarket community today</p>
                <form action="" onSubmit={submitHandler}>
                    <div className='mb-4 justify-items-start relative'>
                        <h1 className=" ml-5 text-blue-800">Email Address</h1>
                        <FaRegEnvelope className="absolute left-9 top-[48px] -translate-y-1/2 text-gray-400" />
                        <input type="email" placeholder='your@example.com' className="border-2 border-blue-500 h-[45px] w-[90%] rounded-lg placeholder:text-sm pl-9 pr-3 placeholder:items-center focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-4 justify-items-start relative'>

                        <h1 className=" ml-5 text-blue-800">Password</h1>

                        <MdOutlineLock className="absolute left-9 top-[48px] -translate-y-1/2 text-gray-400" />

                        <input type={visible ? "text" : "password"} placeholder='type your password' className="border-2 border-blue-500 h-[45px] w-[90%] rounded-lg placeholder:text-sm pl-9 pr-3 placeholder:items-center focus:outline-none " value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        {visible ? (<MdOutlineVisibilityOff className="absolute right-9 top-[48px] -translate-y-1/2 text-gray-500 text-xl cursor-pointer" onClick={() => setVisible(false)} />)

                            : (<MdOutlineVisibility className="absolute right-9 top-[48px] -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                                onClick={() => setVisible(true)}
                            />)
                        }
                    </div>
                    <div className='mb-4 justify-items-start relative'>

                        <h1 className=" ml-5 text-blue-800">Confirm Password</h1>

                        <MdOutlineLock className="absolute left-9 top-[48px] -translate-y-1/2 text-gray-400" />

                        <input type={confirmVisible ? "text" : "password"} placeholder='Confirm password' className="border-2 border-blue-500 h-[45px] w-[90%] rounded-lg placeholder:text-sm pl-9 pr-3 placeholder:items-center focus:outline-none " value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />

                        {confirmVisible ? (<MdOutlineVisibilityOff className="absolute right-9 top-[48px] -translate-y-1/2 text-gray-500 text-xl cursor-pointer" onClick={() => setConfirmVisible(false)} />)

                            : (<MdOutlineVisibility className="absolute right-9 top-[48px] -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                                onClick={() => setConfirmVisible(true)}
                            />)
                        }
                    </div>
                    <div className='mb-4 justify-items-start'>
                        <h1 className=" ml-5 text-blue-800">DisplayName</h1>
                        <input type="text" placeholder='(Optional)' className="border-2 border-blue-500 h-[45px] w-[90%] rounded-lg placeholder:text-sm placeholder:pl-2 placeholder:items-center focus:outline-none " value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <div className="justify-items-start text-blue-900 ml-5">
                        <h1>Account Role</h1>
                    </div>
                    <div className='mb-2 justify-items-start flex '>


                        <div onClick={() => setRole("customer")}

                            className={`border2 p-5 shadow-sm border-blue-500 ml-5 mt-2 rounded-lg h-[100px] w-[185px] cursor-pointer transition-all duration-200 active:scale-95 hover:shadow-md ${role === "customer" ? "bg-blue-200 border-blue-600" : "bg-white border-blue-500"}`}>


                            <FaShoppingCart className='text-blue-900' />
                            <h1 className='text-blue-900 text-[22px]'>Customer</h1>
                            <p className='items- text-sm text-blue-600'>Shop local goods</p>


                        </div>
                        <div onClick={() => setRole("vendor")}

                            className={`border2 p-5 shadow-sm border-blue-500 ml-5 mt-2 rounded-lg h-[100px] w-[185px] cursor-pointer transition-all duration-200 active:scale-95 hover:shadow-md ${role === "vendor" ? "bg-blue-200 border-blue-600" : "bg-white border-blue-500"}`}>


                            <FaStore className='text-blue-900' />
                            <h1 className='text-blue-900 text-[22px]'>Vendor</h1>
                            <p className='items- text-sm text-blue-600'>Sell your products</p>
                        </div>
                    </div>
                    <button type='submit' className="w-[90%] h-[45px] mt-4 font-semibold rounded-lg text-white bg-blue-600 mb-4">Create Account</button>
                    <div className='flex justify-center gap-1'>
                        <p>Already have an account?{" "}</p>
                        <Link className='text-blue-600 mb-5' to='/login'>Log in</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register

