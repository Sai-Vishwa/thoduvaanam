import './index.css'
import { Editor } from '@monaco-editor/react'
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import CodingPage from './pages/CodingPage/CodingPage'
import LeaderBoardPage from './pages/LeaderBoard/LeaderBoardPage'
import HomePage from './pages/Homepage/HomePage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import HelloPage from './pages/HelloPage/HelloPage'
import QuestionPage from './pages/QuestionPage/QuestionPage'
import ContestPage from './pages/ContestPage/ContestPage'
import ReviewPage from './pages/ReviewPage/ReviewPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/:uname' element={<HomePage />}/>
        <Route path='/:uname/code/:qname' element={<CodingPage />}/>
        <Route path='/leaderboard' element={<LeaderBoardPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/' element={<HelloPage />} />
        <Route path='/:uname/question/:qname' element={<QuestionPage />} />
        <Route path='/:uname/contest/:tname' element={<ContestPage />} />
        <Route path='/:uname/review/:qname' element={<ReviewPage />} />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
