import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Home from './pages/Home.tsx'
import LogInPage from './pages/LogInPage.tsx'
import RegisterPage from './pages/SignUpPage.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import ProfilePage from './pages/ProfilePage.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home></Home>} />
      <Route path='/login' element={<LogInPage></LogInPage>} />
      <Route path='/register' element={<RegisterPage></RegisterPage>} />
      {/* PRIVATE ROUTE */}
      <Route path='' element={<PrivateRoute></PrivateRoute>}>
      <Route path='/profile' element={<ProfilePage></ProfilePage>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
