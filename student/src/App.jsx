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
import TextScramble from './pages/dummy'
import ChangePasswordPage from './pages/passwordChangePage/ChangePasswordPage'
import DiscussionsPage from './pages/DiscussionsPage/DiscussionsPage'
import AdminDetails from './pages/AdminPage/AdminDetails'
// import ScrollAnimation from './pages/HelloPage/Hel
import EnhancedAnimation from './pages/HelloPage/HelloTwo'
import ScrollAnimation from './pages/HelloPage/HelloTwo'
import SimpleScrollAnimation from './pages/HelloPage/HelloTwo'
import CssDoodleAnimation from './pages/dummy'
import SnowBackground from './pages/dummy'
import Hello3 from './pages/HelloPage/Hello3'
import HelloThree from './pages/HelloPage/Hello3'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/:uname' element={<HomePage />}/>
        <Route path='/:uname/code/:tname/:qname' element={<CodingPage />}/>
        <Route path='/:uname/leaderboard' element={<LeaderBoardPage />}/>
        <Route path='/:uname/discussions' element={<DiscussionsPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/' element={<HelloPage />} />
        <Route path='/hello2' element={<SimpleScrollAnimation />} />
        <Route path='/hello3' element={<HelloThree />} />
        <Route path='/hello4' element={<SnowBackground />} />


        <Route path='/:uname/question/:qname' element={<QuestionPage />} />
        <Route path='/:uname/contest/:tname' element={<ContestBasicPage />} />
        <Route path='/:uname/contest-handler/:tname' element={<ContestHandlerPage />} />
        <Route path='/:uname/review-question/:qname' element={<ReviewQuestionPage />} />
        <Route path='/:uname/review-contest/:tname' element={<ReviewContestPage />} />
        <Route path='/admin' element={<AdminDetails />} />
        <Route path='*' element={<Navigate to={"/"} />} />
        <Route path='/:uname/dummy/:tname/:qname' element={<DummyPage />} />
        <Route path='/:uname/change-password' element={<ChangePasswordPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
