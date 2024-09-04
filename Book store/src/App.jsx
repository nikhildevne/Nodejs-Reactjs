import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom'
import Home from './components/Home'
import Addbook from './components/Addbook'

function App() {

  return (
    <>
      <h1>Book Store</h1>
      <Router>
      <Link to="/">Home</Link>
      <Link to="/addbook" style={{ marginLeft: '10px' }}>Add Books</Link>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addbook' element={<Addbook/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
