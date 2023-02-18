import React, { Component } from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 10
  }
  apiKey = process.env.REACT_APP_NEWS_API
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  pageSize = 9
  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <div>
            <Routes>
              <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'business'} pageSize={this.pageSize} category={'business'} />} />
              <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'entertainment'} pageSize={this.pageSize} category={'entertainment'} />} />
              <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'general'} pageSize={this.pageSize} category={'general'} />} />
              <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'health'} pageSize={this.pageSize} category={'health'} />} />
              <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'science'} pageSize={this.pageSize} category={'science'} />} />
              <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'sports'} pageSize={this.pageSize} category={'sports'} />} />
              <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={'technology'} pageSize={this.pageSize} category={'technology'} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}