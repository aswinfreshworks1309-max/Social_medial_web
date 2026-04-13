import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
