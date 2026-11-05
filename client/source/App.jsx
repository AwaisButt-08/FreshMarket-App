import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import './App.css'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import VerifyOtpPage from './Pages/VerifyOtpPage.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
     <Routes>
      <Route  path="/" element={<HomePage/>} />
      <Route  path="/login" element={<LoginPage/>} />
      <Route  path="/register" element={<RegisterPage/>} />
      <Route  path="/verifyOtp" element={<VerifyOtpPage/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
