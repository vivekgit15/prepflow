import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='max-w-5xl mx-auto px-6 py-16'>
        <button
          onClick={() => navigate('/')}
          className='mb-8 inline-flex items-center px-5 py-3 rounded-full bg-black text-white hover:bg-gray-900 transition'
        >
          Back to Home
        </button>

        <div className='bg-white rounded-3xl shadow-lg border border-gray-200 p-10'>
          <h1 className='text-3xl font-semibold mb-4'>Interview History</h1>
          <p className='text-gray-600 mb-6'>
            {userData ? `Logged in as ${userData.name}. Review your past interviews and performance here.` : 'Sign in to see your interview history.'}
          </p>

          <div className='rounded-2xl border border-dashed border-gray-300 p-8 text-center'>
            <p className='text-gray-500'>Interview history is coming soon.</p>
            <p className='text-sm text-gray-400 mt-3'>For now, you can start a new interview from the home page.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
