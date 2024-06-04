import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login/login.tsx'
import Password from './pages/password/password.tsx'
import Otp from './pages/otp/otp.tsx'
import Admin from './pages/admin/index.tsx'
import { v4 } from 'uuid';
import { AppIDProvider } from './context/AppContext.ts';
import EmailProvider from './index.tsx'

const id = v4();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/login",
    element: <Login/>,
    
  },
  {
    path: "/password",
    element: <Password/>,
  },
  {
    path: "/otp",
    element: <Otp/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppIDProvider.Provider value={id}>
      <EmailProvider>
        < RouterProvider router={router}/>
      </EmailProvider>
    </AppIDProvider.Provider>
  </React.StrictMode>,
)
