import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUp from '../Pages/SignUp.jsx'
import SignIn from '../Pages/SignIn.jsx'
import './index.css'
import App from './App.jsx'
import LandingPage from '../Pages/LandingPage.jsx'
import { ThemeProvider } from '../Utility/ThemeContext.jsx'
import Settings from '../Pages/Settings.jsx'
import { UserProvider } from '../Utility/UserContext.jsx'
import Share from '../Pages/Share.jsx'
import FormPage from '../Pages/FormPage/FormPage.jsx'
import FillForm from '../Pages/FillForm/FillForm.jsx'
import { WorkSpaceProvider } from '../Utility/WorkSpaceContext.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <UserProvider>
      <ThemeProvider>
      <WorkSpaceProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/fillform/:formToken" element={<FillForm />}/>
        <Route path="/dashboard/:id" element={<App />} />
        <Route path="/share/:linktoken" element={<Share />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forms/:id" element={<FormPage/>}/>
        
      </Routes>
      </WorkSpaceProvider>
      </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
 
)
