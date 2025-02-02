import './index.css'
import { Editor } from '@monaco-editor/react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import LoginAndSignUpPage from './pages/LoginAndSignUpPage/Login'
import DashboardPage from './pages/DashboardPage'
import CodingPage from './pages/CodingPage'
import LeaderBoardPage from './pages/LeaderBoard/LeaderBoardPage'
import HomePage from './pages/Homepage/HomePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login-signup' element={<LoginAndSignUpPage />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/code' element={<CodingPage />}/>
        <Route path='/leaderboard' element={<LeaderBoardPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
