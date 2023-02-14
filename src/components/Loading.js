import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src="imgs/loader.gif" alt="Loading" style={{height:"200px", width:"200px"}} />
      </div>
    )
  }
}
