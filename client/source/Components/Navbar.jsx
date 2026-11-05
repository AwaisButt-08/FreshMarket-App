import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { LuShoppingBag } from 'react-icons/lu'

const Navbar = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const HandleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await logout();

            if (response) {
                toast.success("Logout successfully!")
                navigate('/login')
            }
        } catch (error) {
            toast.error("Logout Failed!")
        }
    }
    return (
        <div className='bg-blue-600 p-4 pl-20 font flex justify-between'>
            <div className='flex gap-2 items-center'>
                <LuShoppingBag className='text-white text-[24px]' />
                <h1 className='text-white text-2xl font-semibold'>
                    <Link to='/'>FreshMarket</Link>
                </h1>
            </div>

            <div className='flex'>
                <ul className='text-white pr-20 flex  items-center text-lg font-semibold gap-6'>
                    <li className=''>
                        <Link className={location.pathname === "/login"
                            ? "text-black"
                            : "text-white"} to='/login'>Login</Link>

                    </li>
                    <li>
                        <Link className={location.pathname === "/register"
                            ? "text-black"
                            : "text-white"} to='/register'>Register</Link>
                    </li>
                    <li>
                        <Link className={location.pathname === "/verifyOtp"
                            ? "text-black"
                            : "text-white"} to='/verifyOtp'>VerifyOtp</Link>
                    </li>
                    <li className={location.pathname === "/profile"
                        ? "text-black"
                        : "text-white"} onClick={HandleLogout} >Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
