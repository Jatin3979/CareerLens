import React from 'react'
import {router} from './app.route'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
