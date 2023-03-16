import React, { useState } from 'react'
import "./App.css"
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import NotFound from './NotFound'

export default function App() {

  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize = 9

  const [searchText, setSearchText] = useState('')
  const [clickSearchText, SetclickSearchText] = useState('')

  const handleSearchText = async (event) => {
    event.preventDefault()
    var text = event.target.value
    setSearchText(text)
  }
  const finalSearchText = () => {
    if (searchText.length !== 0) {
      SetclickSearchText(searchText)
    }
    else{
      alert("Enter Something to search")
    }
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
            <Link htmlFor="search" onClickCapture={finalSearchText} to={`/search/${clickSearchText}`}><button className="btn btn-outline-success">Search</button></Link>
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
              <Route path={`search/${clickSearchText}`} element={<News setProgress={setProgress} apiKey={apiKey} key={'search'} pageSize={pageSize} searchText={clickSearchText} />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}
