import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import LoginAdmin from './pages/LoginAdmin'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home
  },
  {
    path: '/LoginAdmin',
    Component: LoginAdmin
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
