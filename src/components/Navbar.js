import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { darkMode, lightMode, modeStyle } from '../redux/reducer/darkModeReducer'

export default function Navbar() {
    const dispatch = useDispatch()
    const changeStyle = useSelector(modeStyle);
    const [setMode, setSetMode] = useState('light')
    const changeMode = () => {
        if (setMode === 'light') {
            console.log(changeStyle);
            setSetMode('dark')
            dispatch(darkMode())
        }
        else if (setMode === 'dark') {
            console.log(changeStyle);
            setSetMode('light')
            dispatch(lightMode())
        }
    }

    return (
        <div className="sticky-top" >
            <nav className={`navbar container navbar-expand-lg navbar-${changeStyle.type} ${changeStyle.bg}`} data-bs-theme={changeStyle.type === 'light' ? '' : 'dark'} >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NR News</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select Category
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/business" >business</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment" >entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/" >general</Link></li>
                                    <li><Link className="dropdown-item" to="/health" >health</Link></li>
                                    <li><Link className="dropdown-item" to="/science" >science</Link></li>
                                    <li><Link className="dropdown-item" to="/sports" >sports</Link></li>
                                    <li><Link className="dropdown-item" to="/technology" >technology</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <button className={`bg-transparent hover:pointer border-0 d-flex align-items-center ${changeStyle.text} fs-4`} onClick={changeMode}>
                            <span className='fs-6 me-2'>{changeStyle.type === 'light' ? "Enable Dark Mode" : "Enable Light Mode"}</span>
                            <i className={`bi bi-${changeStyle.type === 'light' ? 'moon-stars-fill' : 'brightness-high-fill'}`} />
                        </button>
                    </div>
                </div>
            </nav>
            <hr className={`m-0 ${changeStyle.text}`} />
        </div>

    )
};