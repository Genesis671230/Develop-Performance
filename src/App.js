import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom'
import { AuthorizationContext } from './context/AuthContext'
import { userInputs } from './formSource'
import { RoutesArr } from './RoutesArray'
import { useContext } from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import Welcome from './pages/welcom/Welcome'
import Navbar from './components/navbar/Navbar'
import Login from './pages/Login/Login'
import Signup from './pages/signup/Signup'
import Edit from './pages/Edit/Edit'
import Add from './pages/Add/Add'
import './App.css'
import About from './pages/about/About'
import Contact from './pages/Contact/Contact'
import Footer from './components/footer/Footer'
import { theme } from './pages/theme'
import { ThemeProvider } from '@mui/material'

function App() {
  const { currentUser, data } = useContext(AuthorizationContext)

  const RequireNav = ({ children }) => {
    const location = useLocation()
    if (
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/about' ||
      location.pathname === '/contact' ||
      location.pathname === '/'
    ) {
      return null
    }
    return children
  }

  const RequireAuth = ({ children }) => {
    return currentUser !== null ? children : <Navigate to="/login" />
  }

  const RequireRole = ({ children }) => {
    const par = useParams()
    const go = par.goal
    const location = useLocation()
    if (data.role === 7575) {
      if (
        location.pathname === '/goal' ||
        location.pathname === '/goal/new' ||
        location.pathname === `/goal/${go}` ||
        location.pathname === '/reports' ||
        location.pathname === '/reports/new' ||
        location.pathname === `/reports/${go}` ||
        location.pathname === '/score' ||
        location.pathname === '/score/new' ||
        location.pathname === `/score/${go}` ||
        location.pathname === '/task' ||
        location.pathname === '/task/new' ||
        location.pathname === `/task/${go}`
      ) {
        return children
      }
    } else if (data.role === 9595) {
      return children
    } else if (data.role === 8585) {
      return children
    }
    return data.role === 9595 ? children : <Navigate to="/dashboard" />
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <RequireNav>
            <Navbar />
          </RequireNav>
          <div className="appContainer">
            <div className="page1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/signup"
                  element={<Signup userInputs={userInputs} />}
                />

                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                {RoutesArr.map((routeArr) => {
                  return (
                    <>
                      <Route
                        path={routeArr.path}
                        element={
                          <RequireAuth>
                            <RequireRole>{routeArr.page}</RequireRole>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={routeArr.editPageLink}
                        element={
                          <RequireAuth>
                            <RequireRole>
                              <Edit
                                endpoint={routeArr.editEndPoint}
                                departmentData={routeArr.departmentData}
                                title={routeArr.Edittitle}
                              />
                            </RequireRole>
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={routeArr.newPageLink}
                        element={
                          <RequireAuth>
                            <RequireRole>
                              <Add
                                endpoint={routeArr.AddEndpoint}
                                departmentData={routeArr.addDepartmentData}
                                title={routeArr.title}
                              />
                            </RequireRole>
                          </RequireAuth>
                        }
                      />
                    </>
                  )
                })}
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
