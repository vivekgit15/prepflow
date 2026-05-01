import React from 'react'
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import History from './pages/History'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewReport from './pages/InterviewReport'
import PricingPage from './pages/PricingPage'
import InterviewHistory from './pages/InterviewHistory'

export const ServerUrl = import.meta.env.VITE_SERVER_URL || (import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_SERVER_URL : "https://prepflow-tj85.onrender.com");

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory />} />
      <Route path="/pricing"  element={<PricingPage />}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>
    </Routes>
  )
}

export default App 
