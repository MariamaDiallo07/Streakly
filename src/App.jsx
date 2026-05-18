import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AllHabitsPage from "./pages/AllHabitsPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import TodayPage from './pages/TodayPage'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>}>
        <Route path='/' element={<Navigate to={'/today'}/>} />
        <Route path= "/allHabit" element={<AllHabitsPage/>}/>
        <Route path= "/settings" element={<SettingsPage/>}/>
        <Route path= "/analytics" element={<AnalyticsPage/>}/>
        <Route path='/today' element={<TodayPage/>}/>
      </Route>
       <Route path= "/login" element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}