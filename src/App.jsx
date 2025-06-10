import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { AppContext } from './Context/AppContext'
import { useContext } from 'react'
import Create from './pages/Posts/Create'
import Show from './pages/Posts/Show'
import Update from './pages/Posts/Update'

export default function App() {
  const {user} = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Home/>:<Register />} />
          <Route path="/login" element={user ? <Home/>:<Login />} />
          <Route path="/create" element={user ? <Create/>:<Login />} />
          <Route path="/posts/:id" element={<Show />} />
          <Route path="/posts/update/:id" element={user ? <Update/>:<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
