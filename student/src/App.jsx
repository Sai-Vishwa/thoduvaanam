import './index.css'
import { Editor } from '@monaco-editor/react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import CodingPage from './pages/CodingPage/CodingPage'
import LeaderBoardPage from './pages/LeaderBoard/LeaderBoardPage'
import HomePage from './pages/Homepage/HomePage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import HelloPage from './pages/HelloPage/HelloPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/home/:uname' element={<HomePage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/code' element={<CodingPage />}/>
        <Route path='/leaderboard' element={<LeaderBoardPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/' element={<HelloPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
