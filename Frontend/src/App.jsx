import React from 'react'
import {router} from './app.route'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
