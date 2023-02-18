import React, {useState} from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

export default function App () {
  
  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize = 9
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Navbar />
          <div>
            <Routes>
              <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key={'business'} pageSize={pageSize} category={'business'} />} />
              <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key={'entertainment'} pageSize={pageSize} category={'entertainment'} />} />
              <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key={'general'} pageSize={pageSize} category={'general'} />} />
              <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key={'health'} pageSize={pageSize} category={'health'} />} />
              <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key={'science'} pageSize={pageSize} category={'science'} />} />
              <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key={'sports'} pageSize={pageSize} category={'sports'} />} />
              <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key={'technology'} pageSize={pageSize} category={'technology'} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
