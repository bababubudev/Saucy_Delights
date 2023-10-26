import { useState } from 'react'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import RecipePage from './pages/RecipePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/recipes/:id",
    element: <RecipePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
