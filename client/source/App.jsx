import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route  path="/" element={<HomePage/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
