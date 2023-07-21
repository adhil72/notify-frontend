import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Auth from "./App/Auth/Auth";
import { useEffect } from "react";
function App() {

  const router = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (router.pathname != '/auth') {
      if (localStorage.getItem('token')==null) {
        nav('/auth')
      }
    }
  }, [router.pathname])

  return <>
    <Routes>
      <Route path="/auth" Component={Auth} />
    </Routes>
  </>
}

export default App;
