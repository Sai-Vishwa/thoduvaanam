import './index.css'
import { Editor } from '@monaco-editor/react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import LoginAndSignUpPage from './pages/loginSignUpPage'
import DashboardPage from './pages/DashboardPage'
import CodingPage from './pages/CodingPage'
import LeaderBoardPage from './pages/LeaderBoardPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginAndSignUpPage />}/>
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/code' element={<CodingPage />}/>
        <Route path='leaderboard' element={<LeaderBoardPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
