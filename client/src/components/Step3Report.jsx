import React from 'react'
import { useNavigate } from 'react-router-dom'

const Step3Report = ({ report }) => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-10'>
        <h1 className='text-3xl font-bold text-emerald-600 mb-6'>Interview Summary</h1>
        {report ? (
          <div className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-gray-50 border border-gray-200 rounded-3xl p-6'>
                <h2 className='font-semibold text-lg mb-2'>Final Score</h2>
                <p className='text-5xl font-bold text-emerald-700'>{report.finalScore}</p>
              </div>
              <div className='bg-gray-50 border border-gray-200 rounded-3xl p-6'>
                <h2 className='font-semibold text-lg mb-2'>Accuracy Metrics</h2>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div>
                    <p className='text-xl font-semibold'>{report.confidence}</p>
                    <p className='text-sm text-gray-500'>Confidence</p>
                  </div>
                  <div>
                    <p className='text-xl font-semibold'>{report.communication}</p>
                    <p className='text-sm text-gray-500'>Communication</p>
                  </div>
                  <div>
                    <p className='text-xl font-semibold'>{report.correctness}</p>
                    <p className='text-sm text-gray-500'>Correctness</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 border border-gray-200 rounded-3xl p-6'>
              <h2 className='font-semibold text-lg mb-4'>Question by Question Feedback</h2>
              <div className='space-y-4'>
                {report.questionWiseScore?.map((item, index) => (
                  <div key={index} className='rounded-2xl bg-white border border-gray-200 p-4'>
                    <div className='text-sm text-gray-400 mb-2'>Question {index + 1}</div>
                    <p className='font-semibold text-gray-800 mb-2'>{item.question}</p>
                    <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
                      <span className='px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full'>Score: {item.score}</span>
                      <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full'>Confidence: {item.confidence}</span>
                      <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full'>Communication: {item.communication}</span>
                      <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full'>Correctness: {item.correctness}</span>
                    </div>
                    <p className='mt-3 text-gray-700'>{item.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-20 text-gray-500'>No report available yet.</div>
        )}
        <button
          onClick={() => navigate('/')}
          className='mt-8 w-full rounded-full bg-emerald-600 text-white py-3 text-lg font-semibold hover:bg-emerald-700 transition'
        >
          Return Home
        </button>
      </div>
    </div>
  )
}

export default Step3Report
