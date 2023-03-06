import React, { useState } from 'react'
import "./App.css"
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

export default function App() {

  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize = 9

  const [searchText, setSearchText] = useState('')


  const handleSearchText = async (event) => {
    event.preventDefault()
    let text = event.target.value
    setSearchText(text)
  }
  
  const onclicksearch = async (event) => {
    // event.preventDefault()
  }

  return (
    <>
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Navbar />
          <form className='d-flex flex-row container mt-4 mb-3'>
            <input id='search' className="form-control me-2" type="search" placeholder="Search any Topic" aria-label="Search" onChange={handleSearchText} />
            <button type='submit' htmlFor="search" className="btn btn-outline-success" onClick={onclicksearch}><Link to={`/search/${searchText}`}>Search</Link></button>
          </form>
          <div>
            <Routes>
              <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key={'business'} pageSize={pageSize} category={'business'} />} />
              <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key={'entertainment'} pageSize={pageSize} category={'entertainment'} />} />
              <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key={'general'} pageSize={pageSize} category={'general'} />} />
              <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key={'health'} pageSize={pageSize} category={'health'} />} />
              <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key={'science'} pageSize={pageSize} category={'science'} />} />
              <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key={'sports'} pageSize={pageSize} category={'sports'} />} />
              <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key={'technology'} pageSize={pageSize} category={'technology'} />} />
              <Route path={`/search/${searchText}`} element={<News setProgress={setProgress} apiKey={apiKey} key={'search'} pageSize={pageSize} searchText={searchText} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}
