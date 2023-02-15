import React, { Component } from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/business' element={<News key={'business'} pageSize={9} category={'business'} />} />
              <Route path='/entertainment' element={<News key={'entertainment'} pageSize={9} category={'entertainment'} />} />
              <Route path='/' element={<News key={'general'} pageSize={9} category={'general'} />} />
              <Route path='/health' element={<News key={'health'} pageSize={9} category={'health'} />} />
              <Route path='/science' element={<News key={'science'} pageSize={9} category={'science'} />} />
              <Route path='/sports' element={<News key={'sports'} pageSize={9} category={'sports'} />} />
              <Route path='/technology' element={<News key={'technology'} pageSize={9} category={'technology'} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}