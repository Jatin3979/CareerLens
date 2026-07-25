import React from 'react'
import {router} from './app.route'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
