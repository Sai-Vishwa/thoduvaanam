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
import ContestBasicPage from './pages/ContestBasicPage/ContestBasicPage'
import ReviewQuestionPage from './pages/ReviewQuestionPage/ReviewQuestionPage'
import ReviewContestPage from './pages/ReviewContestPage/ReviewContestPage'
import ContestHandlerPage from './pages/ContestHandlerPage/ContestHandlerPage'
import DummyPage from './pages/CodingPage/dummy'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/:uname' element={<HomePage />}/>
        <Route path='/:uname/code/:tname/:qname' element={<CodingPage />}/>
        <Route path='/leaderboard' element={<LeaderBoardPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/' element={<HelloPage />} />
        <Route path='/:uname/question/:qname' element={<QuestionPage />} />
        <Route path='/:uname/contest/:tname' element={<ContestBasicPage />} />
        <Route path='/:uname/contest-handler/:tname' element={<ContestHandlerPage />} />
        <Route path='/:uname/review-question/:qname' element={<ReviewQuestionPage />} />
        <Route path='/:uname/review-contest/:tname' element={<ReviewContestPage />} />
        <Route path='*' element={<Navigate to={"/:uname"} />} />
        <Route path='/:uname/dummy/:tname/:qname' element={<DummyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
