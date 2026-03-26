import React from 'react'
import mainRouter from './MainRouter'
import authRouter from './authRouter'
import { createBrowserRouter } from 'react-router-dom'

const Router = createBrowserRouter([authRouter, mainRouter])

export default Router